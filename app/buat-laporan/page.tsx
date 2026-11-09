
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Shield,
  LayoutDashboard,
  FilePlus,
  Folder,
  CircleHelp,
  Bell,
  UserRound,
  ChevronDown,
  Plus,
  X,
  Link2,
  FileText,
  CheckCircle2,
  AlertCircle,
  LockKeyhole,
  Send,
} from "lucide-react";

type Role = "korban" | "pendamping";
type UrlAnalysisResult = {
  url: string;
  domain: string;
  dns: {
    a: string[];
    aaaa: string[];
    ns: string[];
    mx: {
      exchange: string;
      priority: number;
    }[];
  };
  rdap: {
    available: boolean;
    registrar: string | null;
    events: {
      eventAction?: string;
      eventDate?: string;
    }[];
    nameservers: string[];
    status: string[];
  };
};

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Buat Laporan", href: "/buat-laporan", icon: FilePlus },
  { label: "Laporan Saya", href: "/laporan-saya", icon: Folder },
  { label: "Bantuan", href: "/bantuan", icon: CircleHelp },
];

const contentTypes = [
  "Foto Intim",
  "Video Rekaman",
  "Tangkapan Layar Obrolan",
  "Audio / Voice Note",
];

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function BuatLaporanPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [caseType, setCaseType] = useState("");
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [urls, setUrls] = useState([""]);
  const [authorization, setAuthorization] = useState(false);

  const [processed, setProcessed] = useState(false);
  const [urlAnalysis, setUrlAnalysis] = useState<UrlAnalysisResult[]>([]);
  const [consent, setConsent] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [processingAi, setProcessingAi] = useState(false);

  function toggleContent(type: string) {
    setSelectedContent((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type]
    );
    setProcessed(false);
  }

  function updateUrl(index: number, value: string) {
    setUrls((current) =>
      current.map((url, i) => (i === index ? value : url))
    );
    setProcessed(false);
  }

  function addUrl() {
    setUrls((current) => [...current, ""]);
  }

  function removeUrl(index: number) {
    setUrls((current) => current.filter((_, i) => i !== index));
    setProcessed(false);
  }

 async function handleProcess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!role) {
      setError("Pilih peran pelapor terlebih dahulu.");
      return;
    }

    if (role === "pendamping" && !authorization) {
      setError("Konfirmasi kewenangan pendamping terlebih dahulu.");
      return;
    }

    if (!caseType || selectedContent.length === 0) {
      setError("Lengkapi kategori kasus dan jenis konten.");
      return;
    }

    if (!eventDate || !description.trim()) {
      setError("Tanggal dan ringkasan kejadian wajib diisi.");
      return;
    }

    const cleanUrls = urls.map((url) => url.trim());

    if (cleanUrls.length === 0 || cleanUrls.some((url) => !url)) {
      setError("Masukkan minimal satu URL sasaran.");
      return;
    }

    if (cleanUrls.some((url) => !isValidUrl(url))) {
      setError("Pastikan semua URL menggunakan format HTTP atau HTTPS yang valid.");
      return;
    }

    if (new Set(cleanUrls).size !== cleanUrls.length) {
      setError("Terdapat URL duplikat. Periksa kembali tautan yang dimasukkan.");
      return;
    }

    
const targetList = cleanUrls
  .map((url, i) => `${i + 1}. ${url}`)
  .join("\n");

setProcessingAi(true);
setProcessed(false);
setError("");

try {
  const response = await fetch("/api/generate-draft", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      role,
      caseType,
      contentTypes: selectedContent,
      eventDate,
      description,
      urlCount: cleanUrls.length,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Gagal memproses laporan.");
  }

  if (typeof result.draft !== "string" || !result.draft.trim()) {
    throw new Error("AI tidak menghasilkan draf.");
  }
  
// Mengirim URL ke backend URL Intelligence
const analysisResponse = await fetch("/api/analyze-url", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    urls: cleanUrls,
  }),
});

const analysisResult = await analysisResponse.json();

if (!analysisResponse.ok) {
  throw new Error(
    analysisResult.error || "Gagal menganalisis URL."
  );
}

setUrlAnalysis(analysisResult.results || []);


  // URL ditambahkan secara lokal, tidak dikirim ke AI
  setDraft(
    `${result.draft}\n\nURL Sasaran:\n${targetList}`
  );

  setConsent(false);
  setProcessed(true);

  setTimeout(() => {
    document.getElementById("hasil-pemrosesan")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);

} catch (err) {
  setError(
    err instanceof Error
      ? err.message
      : "Terjadi kesalahan saat menghubungi AI."
  );
} finally {
  setProcessingAi(false);
}

    setTimeout(() => {
      document.getElementById("hasil-pemrosesan")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  function handleSubmission() {
    if (!consent) {
      setError("Persetujuan pelapor diperlukan sebelum melanjutkan.");
      return;
    }

    setSuccessMessage(
      "Pratinjau pengiriman berhasil. Permohonan belum dikirim karena integrasi kanal resmi belum dihubungkan."
    );
  }

  return (
    <main className="dashboard-app">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <Link href="/dashboard" className="dashboard-brand">
          <div className="dashboard-brand-icon">
            <Shield size={25} />
          </div>
          <div>
            <strong>P.A.D.U.</strong>
            <span>Platform Aduan Digital Terpadu</span>
          </div>
        </Link>

        <nav className="dashboard-nav">
          {menuItems.map((item) => {
            const ItemIcon = item.icon;

            return (
              <Link
                href={item.href}
                key={item.href}
                className={`dashboard-nav-item ${
                  item.href === "/buat-laporan" ? "selected" : ""
                }`}
              >
                <ItemIcon size={19} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-security">
            <LockKeyhole size={15} />
            <span>Sesi Pengguna</span>
          </div>

          <Link href="/" className="sidebar-logout">
            <X size={17} />
            Keluar
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="dashboard-main">
        <header className="dashboard-header">
          <div className="breadcrumb-top">
            <strong>P.A.D.U.</strong>
            <span>/</span>
            <span>Buat Laporan</span>
          </div>

          <div className="header-right">
            <div className="system-status">
              <span className="status-dot" />
              Prototype
            </div>

            <Link href="/bantuan" className="header-action">
              <CircleHelp size={19} />
            </Link>

            <button className="header-action" aria-label="Notifikasi">
              <Bell size={19} />
            </button>

            <button className="user-menu" type="button">
              <span>Pengguna</span>
              <span className="user-avatar">
                <UserRound size={17} />
              </span>
              <ChevronDown size={15} />
            </button>
          </div>
        </header>

        <div className="report-body">
          <div className="report-heading">
            <div className="report-eyebrow">
              FORMULIR PELAPORAN P.A.D.U.
            </div>
            <h1>Buat Laporan Baru</h1>
            <p>Lengkapi informasi kejadian dan URL sasaran.</p>
          </div>

          <form onSubmit={handleProcess}>
            {/* ROLE */}
            <section className="report-card">
              <div className="report-section-heading">
                <span>01</span>
                <h2>Saya Melapor Sebagai</h2>
              </div>

              <div className="role-grid">
                <button
                  type="button"
                  className={`role-card ${role === "korban" ? "chosen" : ""}`}
                  onClick={() => {
                    setRole("korban");
                    setAuthorization(false);
                    setProcessed(false);
                  }}
                >
                  <span className="role-icon">
                    <UserRound size={19} />
                  </span>
                  <span className="role-check">
                    {role === "korban" && <CheckCircle2 size={18} />}
                  </span>
                  <strong>Korban Langsung</strong>
                  <small>Melaporkan konten yang dialami sendiri.</small>
                </button>

                <button
                  type="button"
                  className={`role-card ${role === "pendamping" ? "chosen" : ""}`}
                  onClick={() => {
                    setRole("pendamping");
                    setAuthorization(false);
                    setProcessed(false);
                  }}
                >
                  <span className="role-icon">
                    <UserRound size={19} />
                  </span>
                  <span className="role-check">
                    {role === "pendamping" && <CheckCircle2 size={18} />}
                  </span>
                  <strong>Pendamping / Kuasa</strong>
                  <small>Membantu korban dalam proses pelaporan.</small>
                </button>
              </div>

              {role === "pendamping" && (
                <label className="authorization-check">
                  <input
                    type="checkbox"
                    checked={authorization}
                    onChange={(e) => setAuthorization(e.target.checked)}
                  />
                  <span>
                    Saya memiliki persetujuan atau kewenangan untuk
                    mendampingi pelaporan ini.
                  </span>
                </label>
              )}
            </section>

            {/* CASE INFORMATION */}
            <section className="report-card">
              <div className="report-section-heading">
                <span>02</span>
                <h2>Informasi Kasus</h2>
              </div>

              <div className="report-field">
                <label>Kategori Kasus</label>
                <div className="choice-list">
                  {["NCII", "Sextortion"].map((type) => (
                    <button
                      type="button"
                      key={type}
                      className={`choice-chip ${
                        caseType === type ? "active" : ""
                      }`}
                      onClick={() => {
                        setCaseType(type);
                        setProcessed(false);
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="report-field">
                <label>Jenis Konten</label>
                <div className="choice-list">
                  {contentTypes.map((type) => (
                    <button
                      type="button"
                      key={type}
                      className={`choice-chip ${
                        selectedContent.includes(type) ? "active" : ""
                      }`}
                      onClick={() => toggleContent(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <small className="field-hint">
                  Pilih jenis konten yang dilaporkan. Tidak perlu mengunggah
                  foto atau video intim.
                </small>
              </div>

              <div className="report-field">
                <label htmlFor="event-date">
                  Tanggal Pertama Diketahui
                </label>
                <input
                  id="event-date"
                  type="date"
                  className="report-input"
                  value={eventDate}
                  onChange={(e) => {
                    setEventDate(e.target.value);
                    setProcessed(false);
                  }}
                />
              </div>

              <div className="report-field">
                <label htmlFor="description">
                  Deskripsi Singkat Kejadian
                </label>
                <textarea
                  id="description"
                  className="report-textarea"
                  placeholder="Tuliskan ringkasan kejadian..."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setProcessed(false);
                  }}
                  rows={4}
                />
              </div>
            </section>

            {/* URL INPUT */}
            <section className="report-card">
              <div className="report-section-heading">
                <span>03</span>
                <h2>URL Sasaran</h2>
              </div>

              {urls.map((url, index) => (
                <div className="url-input-row" key={index}>
                  <Link2 size={18} />
                  <input
                    type="url"
                    placeholder="https://contoh.com/konten"
                    value={url}
                    onChange={(e) => updateUrl(index, e.target.value)}
                    aria-label={`URL sasaran ${index + 1}`}
                  />

                  {urls.length > 1 && (
                    <button
                      type="button"
                      className="remove-url"
                      onClick={() => removeUrl(index)}
                      aria-label="Hapus URL"
                    >
                      <X size={17} />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="add-url-button"
                onClick={addUrl}
              >
                <Plus size={15} />
                Tambah URL Sasaran
              </button>

              <div className="report-notice">
                <LockKeyhole size={16} />
                <span>
                  Jangan mengunggah atau mengirim salinan foto maupun video
                  intim dalam formulir ini.
                </span>
              </div>
            </section>

            {/* ERROR */}
            {error && (
              <div className="report-error" role="alert">
                <AlertCircle size={17} />
                {error}
              </div>
            )}

            {/* PROCESS BUTTON */}
            <div className="process-panel">
              <div>
                <h3>Proses Laporan</h3>
                <p>
                  Periksa kembali informasi sebelum menjalankan pemrosesan.
                </p>
              </div>

              <button
                type="submit"
                className="process-button"
                disabled={processingAi}
              >
                <FileText size={17} />
                {processingAi ? "AI Sedang Memproses..." : "Proses Laporan"}
              </button>
            </div>
          </form>

          {/* RESULTS ONLY AFTER PROCESSING */}
          {processed && (
            <section id="hasil-pemrosesan" className="processed-results">
              <div className="report-section-heading result-title">
                <span>04</span>
                <h2>Hasil Identifikasi URL</h2>
              </div>

              <div className="report-card">
                
            {urlAnalysis.map((item, index) => (
              <div key={`${item.domain}-${index}`}>
                <div className="analysis-row">
                  <div className="analysis-domain">
                    <Link2 size={18} />
                    <div>
                      <strong>{item.domain}</strong>
                      <small>{item.url}</small>
                    </div>
                  </div>

                  <span className="status-pill valid">
                    <CheckCircle2 size={13} />
                    Analisis Selesai
                  </span>
                </div>

                <div
                  style={{
                    marginTop: 12,
                    marginBottom: 18,
                    fontSize: 13,
                    lineHeight: 1.9,
                    color: "#555",
                  }}
                >
                  <div>
                    <strong>IP IPv4:</strong>{" "}
                    {item.dns.a.join(", ") || "Tidak ditemukan"}
                  </div>

                  <div>
                    <strong>IP IPv6:</strong>{" "}
                    {item.dns.aaaa.join(", ") || "Tidak ditemukan"}
                  </div>

                  <div>
                    <strong>Nameserver:</strong>{" "}
                    {item.dns.ns.join(", ") || "Tidak ditemukan"}
                  </div>

                  <div>
                    <strong>Mail Server:</strong>{" "}
                    {item.dns.mx
                      .map((mx) => `${mx.exchange} (Prioritas ${mx.priority})`)
                      .join(", ") || "Tidak ditemukan"}
                  </div>

                  <div>
                    <strong>Registrar:</strong>{" "}
                    {item.rdap.registrar || "Tidak tersedia"}
                  </div>

                  <div>
                    <strong>Status RDAP:</strong>{" "}
                    {item.rdap.available
                      ? item.rdap.status.join(", ") || "Tidak tersedia"
                      : "Data RDAP tidak tersedia"}
                  </div>

                  <div>
                    <strong>Tanggal Registrasi / Kedaluwarsa:</strong>{" "}
                    {item.rdap.events
                      .map((event) =>
                        `${event.eventAction}: ${event.eventDate}`
                      )
                      .join(" | ") || "Tidak tersedia"}
                  </div>
                </div>
              </div>
            ))}


                <p className="field-hint">
                  Informasi berasal dari pemeriksaan DNS dan RDAP.
                  Hasil ini merupakan informasi teknis domain, bukan
                  bukti bahwa suatu konten melanggar kebijakan platform.
                </p>
              </div>

              <div className="report-section-heading result-title">
                <span>05</span>
                <h2>Draf Pengaduan</h2>
              </div>

              <div className="report-card">
                <textarea
                  className="report-textarea draft-editor"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={11}
                />

                <p className="field-hint">
                  Draf awal dibuat berdasarkan informasi formulir dan dapat
                  disunting. Integrasi AI akan ditambahkan pada tahap berikutnya.
                </p>
              </div>

              <div className="report-section-heading result-title">
                <span>06</span>
                <h2>Persetujuan & Pengiriman</h2>
              </div>

              <div className="report-card">
                <div className="authorization-check">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      setSuccessMessage("");
                    }}
                  />
                  <span>
                    Saya telah memeriksa dan menyetujui isi laporan ini
                    untuk dikirim.
                  </span>
                </div>

                <button
                  type="button"
                  className="process-button send-button"
                  disabled={!consent}
                  onClick={handleSubmission}
                >
                  <Send size={17} />
                  Kirim Permohonan Takedown
                </button>

                {successMessage && (
                  <div className="report-notice submission-notice">
                    <AlertCircle size={17} />
                    <span>{successMessage}</span>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </section>

      {/* MOBILE NAV */}
      <nav className="dashboard-mobile-nav">
        {menuItems.map((item) => {
          const ItemIcon = item.icon;

          return (
            <Link
              href={item.href}
              key={item.href}
              className={`mobile-menu-item ${
                item.href === "/buat-laporan" ? "selected" : ""
              }`}
            >
              <ItemIcon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </main>
  );
}
