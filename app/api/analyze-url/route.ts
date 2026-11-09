
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { resolve4, resolve6, resolveNs, resolveMx } from "node:dns/promises";
import { domainToASCII } from "node:url";
import { isIP } from "node:net";

type RdapEntity = {
  roles?: string[];
  vcardArray?: unknown;
  entities?: RdapEntity[];
};

type RdapData = {
  entities?: RdapEntity[];
  events?: {
    eventAction?: string;
    eventDate?: string;
  }[];
  nameservers?: {
    ldhName?: string;
  }[];
  status?: string[];
};

async function safeDns<T>(callback: () => Promise<T>): Promise<T | null> {
  try {
    return await callback();
  } catch {
    return null;
  }
}

function getRegistrar(entities: RdapEntity[] = []): string | null {
  for (const entity of entities) {
    if (entity.roles?.includes("registrar")) {
      const vcard = entity.vcardArray as unknown[];

      if (Array.isArray(vcard) && Array.isArray(vcard[1])) {
        for (const row of vcard[1]) {
          if (
            Array.isArray(row) &&
            (row[0] === "fn" || row[0] === "org")
          ) {
            const value = row[3];

            if (typeof value === "string") return value;

            if (Array.isArray(value)) {
              return value.filter(
                (item) => typeof item === "string"
              ).join(" ");
            }
          }
        }
      }
    }

    const nested = getRegistrar(entity.entities || []);

    if (nested) return nested;
  }

  return null;
}

async function analyzeDomain(domain: string, originalUrl: string) {
  const [a, aaaa, ns, mx] = await Promise.all([
    safeDns(() => resolve4(domain)),
    safeDns(() => resolve6(domain)),
    safeDns(() => resolveNs(domain)),
    safeDns(() => resolveMx(domain)),
  ]);

  let rdapResult = {
    available: false,
    registrar: null as string | null,
    events: [] as { eventAction?: string; eventDate?: string }[],
    nameservers: [] as string[],
    status: [] as string[],
  };

  try {
    const response = await fetch(
      `https://rdap.org/domain/${encodeURIComponent(domain)}`,
      {
        headers: {
          Accept: "application/rdap+json, application/json",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      }
    );

    if (response.ok) {
      const data = (await response.json()) as RdapData;

      rdapResult = {
        available: true,
        registrar: getRegistrar(data.entities || []),
        events: (data.events || []).filter(
          (event) =>
            ["registration", "expiration", "last changed"].includes(
              event.eventAction || ""
            )
        ),
        nameservers: (data.nameservers || [])
          .map((item) => item.ldhName)
          .filter((item): item is string => Boolean(item)),
        status: data.status || [],
      };
    }
  } catch {
    // Informasi RDAP dapat tidak tersedia untuk domain tertentu.
  }

  return {
    url: originalUrl,
    domain,
    dns: {
      a: a || [],
      aaaa: aaaa || [],
      ns: ns || [],
      mx: mx || [],
    },
    rdap: rdapResult,
  };
}

export async function POST(request: Request) {
  try {
    // 1. Periksa konfigurasi Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Konfigurasi Supabase belum lengkap." },
        { status: 500 }
      );
    }

    // 2. Periksa sesi pengguna
    const cookieStore = await cookies();

    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }

    // 3. Periksa URL yang dikirim
    const body = await request.json();
    const urls = body.urls;

    if (
      !Array.isArray(urls) ||
      urls.length < 1 ||
      urls.length > 10 ||
      !urls.every((item) => typeof item === "string")
    ) {
      return NextResponse.json(
        { error: "Daftar URL tidak valid." },
        { status: 400 }
      );
    }

    // 4. Ambil domain dari setiap URL
    const targets: { domain: string; originalUrl: string }[] = [];

    for (const value of urls) {
      let parsed: URL;

      try {
        parsed = new URL(value);
      } catch {
        return NextResponse.json(
          { error: "Terdapat URL dengan format tidak valid." },
          { status: 400 }
        );
      }

      if (
        !["http:", "https:"].includes(parsed.protocol) ||
        parsed.username ||
        parsed.password
      ) {
        return NextResponse.json(
          { error: "URL harus menggunakan HTTP atau HTTPS yang valid." },
          { status: 400 }
        );
      }

      const domain = domainToASCII(
        parsed.hostname.replace(/\.$/, "")
      ).toLowerCase();

      if (
        !domain ||
        !domain.includes(".") ||
        isIP(domain) ||
        domain === "localhost" ||
        domain.endsWith(".localhost") ||
        domain.endsWith(".local") ||
        !/^[a-z0-9.-]+$/.test(domain)
      ) {
        return NextResponse.json(
          { error: "Domain tidak dapat dianalisis." },
          { status: 400 }
        );
      }

      targets.push({
        domain,
        originalUrl: value,
      });
    }

    // 5. Jalankan analisis domain
    const results = await Promise.all(
      targets.map((target) =>
        analyzeDomain(target.domain, target.originalUrl)
      )
    );

    return NextResponse.json({
      success: true,
      results,
    });

  } catch (error) {
    console.error("URL Intelligence Error:", error);

    return NextResponse.json(
      { error: "Gagal menganalisis URL." },
      { status: 500 }
    );
  }
}
