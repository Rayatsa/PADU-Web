

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
  try {
    // Memeriksa konfigurasi API
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Konfigurasi server belum lengkap." },
        { status: 500 }
      );
    }

    // Memeriksa sesi pengguna
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

    // Membaca data formulir
    const body = await request.json();

    const {
      role,
      caseType,
      contentTypes,
      eventDate,
      description,
      urlCount,
    } = body;

    // Validasi data
    if (
      !["korban", "pendamping"].includes(role) ||
      !["NCII", "Sextortion"].includes(caseType) ||
      !Array.isArray(contentTypes) ||
      contentTypes.length === 0 ||
      contentTypes.length > 4 ||
      !contentTypes.every((item) => typeof item === "string") ||
      typeof eventDate !== "string" ||
      typeof description !== "string" ||
      !description.trim() ||
      description.length > 5000 ||
      !Number.isInteger(urlCount) ||
      urlCount < 1 ||
      urlCount > 10
    ) {
      return NextResponse.json(
        { error: "Data formulir tidak valid." },
        { status: 400 }
      );
    }

    
    // Membuat draf otomatis secara lokal tanpa OpenAI API

    const reporterLabel =
      role === "korban"
        ? "Korban Langsung"
        : "Pendamping / Kuasa";

    const caseLabel =
      caseType === "NCII"
        ? "Non-Consensual Intimate Content (NCII)"
        : "Sextortion";

    const generatedDraft = [
      "PERMOHONAN PENANGANAN KONTEN",
      "",
      "Kepada Yth. Tim Penanganan Konten Platform",
      "",
      "Dengan hormat,",
      "",
      "Saya mengajukan permohonan pemeriksaan dan penanganan terhadap konten yang dilaporkan melalui Platform Aduan Digital Terpadu (P.A.D.U.).",
      "",
      "INFORMASI PELAPORAN",
      "",
      `Peran Pelapor: ${reporterLabel}`,
      `Kategori Kasus: ${caseLabel}`,
      `Jenis Konten: ${contentTypes.join(", ")}`,
      `Tanggal Pertama Diketahui: ${eventDate}`,
      `Jumlah URL Sasaran: ${urlCount}`,
      "",
      "RINGKASAN KEJADIAN",
      "",
      description.trim(),
      "",
      "PERMOHONAN PENANGANAN",
      "",
      "Berdasarkan informasi tersebut, saya memohon pihak pengelola platform untuk memeriksa URL yang dilaporkan, meninjau kesesuaiannya dengan kebijakan yang berlaku, serta mempertimbangkan tindakan penanganan yang sesuai apabila ditemukan pelanggaran.",
      "",
      "Demikian permohonan ini disampaikan. Saya berharap laporan ini dapat ditinjau dan ditindaklanjuti sesuai prosedur yang berlaku.",
      "",
      "Hormat saya,",
      reporterLabel,
      "",
      "Catatan: Draf ini dibuat secara otomatis berdasarkan informasi formulir dan perlu diperiksa kembali oleh pelapor sebelum digunakan."
    ].join("\n");

    return NextResponse.json({
      success: true,
      draft: generatedDraft,
    });


  } catch (error) {
    console.error("AI Draft Error:", error);

    return NextResponse.json(
      { error: "Gagal membuat draf AI. Silakan coba kembali." },
      { status: 500 }
    );
  }
}
