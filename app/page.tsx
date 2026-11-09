
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setMessage("Email dan kata sandi wajib diisi.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        const errorMessage = error.message.toLowerCase();

        if (errorMessage.includes("invalid login credentials")) {
          setMessage("Email atau kata sandi salah.");
        } else if (errorMessage.includes("email not confirmed")) {
          setMessage("Email belum diverifikasi. Silakan periksa email Anda.");
        } else if (errorMessage.includes("too many requests")) {
          setMessage("Terlalu banyak percobaan. Coba lagi nanti.");
        } else {
          setMessage("Login gagal: " + error.message);
        }

        return;
      }

      setMessage("Login berhasil. Mengalihkan...");

      router.push("/dashboard");
      router.refresh();

    } catch (error) {
      console.error("Login error:", error);
      setMessage("Terjadi kesalahan saat menghubungkan ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand">
          <div className="brand-logo">
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2.5 20 6v5.5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3.5Z" />
            </svg>
          </div>

          <h2>P.A.D.U.</h2>
          <p>Platform Aduan Digital Terpadu</p>
        </div>

        <div className="login-heading">
          <h1>Masuk ke P.A.D.U.</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="nama@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <div className="password-label">
              <label htmlFor="password">Password</label>

              <button
                type="button"
                className="text-link"
                onClick={() =>
                  setMessage("Fitur lupa password belum tersedia.")
                }
              >
                Lupa Password?
              </button>
            </div>

            <div className="password-input">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Tampilkan atau sembunyikan password"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" width="19" height="19">
                    <path
                      d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.5 9.5 7-.4 1-1.3 2.2-2.5 3.3M6.2 6.2C4.7 7.3 3.5 9 2.5 12c.8 2 4.3 7 9.5 7 1.1 0 2.1-.2 3-.6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="19" height="19">
                    <path
                      d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {message && (
            <p className="login-message" role="status">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="register-text">
          Belum punya akun?{" "}
          <button
            type="button"
            className="text-link"
            onClick={() =>
              setMessage("Halaman pendaftaran akan dibuat pada tahap berikutnya.")
            }
          >
            Daftar sekarang
          </button>
        </div>
      </section>
    </main>
  );
}
