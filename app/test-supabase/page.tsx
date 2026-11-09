
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function TestSupabasePage() {
  const [status, setStatus] = useState("Belum dites");
  const [loading, setLoading] = useState(false);

  async function handleTest() {
    setLoading(true);
    setStatus("Sedang menghubungkan...");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      setStatus(
        "Koneksi berhasil! " +
        (data.session ? "Session aktif." : "Belum ada pengguna login.")
      );
    } catch (error) {
      setStatus(
        "Koneksi gagal: " +
        (error instanceof Error ? error.message : "Terjadi kesalahan.")
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Uji Koneksi Supabase P.A.D.U.</h1>
      <p>Status: {status}</p>

      <button onClick={handleTest} disabled={loading}>
        {loading ? "Menguji..." : "Tes Koneksi"}
      </button>
    </main>
  );
}
