
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/buat-laporan/:path*",
    "/laporan-saya/:path*",
    "/bantuan/:path*",
    "/admin/:path*",
    "/api/generate-draft/:path*",
    "/api/analyze-url/:path*",
  ],
};
