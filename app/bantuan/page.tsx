
"use client";

import { useState } from "react";
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
  ChevronRight,
  Search,
  FileText,
  Link2,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Buat Laporan", href: "/buat-laporan", icon: FilePlus },
  { label: "Laporan Saya", href: "/laporan-saya", icon: Folder },
  { label: "Bantuan", href: "/bantuan", icon: CircleHelp },
];

const guides = [
  {
    number: "01",
    icon: FileText,
    title: "Isi Informasi",
    description: "Pilih peran dan lengkapi informasi kejadian.",
  },
  {
    number: "02",
    icon: Link2,
    title: "Masukkan URL",
    description: "Cantumkan tautan konten yang ingin dilaporkan.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Periksa dan Kirim",
    description: "Periksa draf, berikan persetujuan, lalu kirim laporan.",
  },
];

const faqs = [
  {
    question: "Bagaimana cara membuat laporan di P.A.D.U.?",
    answer:
      "Buka menu Buat Laporan, pilih peran sebagai korban atau pendamping, isi informasi kejadian, lalu masukkan URL sasaran. Setelah data lengkap dan URL valid, tekan Proses Laporan untuk melihat hasil pemrosesan dan draf pengaduan.",
  },
  {
    question: "Apa perbedaan peran Korban dan Pendamping?",
    answer:
      "Korban melaporkan kejadian yang dialaminya sendiri. Pendamping membantu korban dalam proses pelaporan dan hanya dapat menggunakan akses atau informasi yang telah diizinkan.",
  },
  {
    question: "Apakah saya perlu mengunggah foto atau video intim?",
    answer:
      "Tidak. P.A.D.U. dirancang untuk memproses informasi laporan dan URL sasaran. Jangan mengunggah atau mengirim salinan foto maupun video intim melalui formulir.",
  },
  {
    question: "Bagaimana cara mengetahui perkembangan laporan?",
    answer:
      "Buka menu Laporan Saya, pilih laporan yang ingin dilihat, lalu periksa status permohonan, aksesibilitas URL, dan riwayat aktivitas yang tersedia.",
  },
  {
    question: "Apa perbedaan status URL dan status takedown?",
    answer:
      "Status URL menunjukkan apakah tautan masih dapat diakses. Status takedown menunjukkan perkembangan permohonan kepada penyedia layanan. Keduanya berbeda; URL yang tidak dapat diakses belum tentu berarti konten telah resmi dihapus.",
  },
  {
    question: "Apa yang harus dilakukan jika belum ada respons?",
    answer:
      "Periksa kembali riwayat laporan dan kanal pengaduan yang digunakan. Apabila diperlukan, ikuti rekomendasi tindak lanjut atau eskalasi yang tersedia pada detail laporan.",
  },
];

export default function BantuanPage() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

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
                  item.href === "/bantuan" ? "selected" : ""
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
            <span>Keluar</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="dashboard-main">
        <header className="dashboard-header">
          <div className="breadcrumb-top">
            <strong>P.A.D.U.</strong>
            <span>/</span>
            <span>Bantuan</span>
          </div>

          <div className="header-right">
            <div className="system-status">
              <span className="status-dot" />
              Prototype
            </div>

            <Link
              href="/bantuan"
              className="header-action"
              aria-label="Bantuan"
            >
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

        <div className="help-page">
          {/* PAGE TITLE */}
          <div className="help-heading">
            <span className="help-eyebrow">PUSAT BANTUAN</span>
            <h1>Pusat Bantuan</h1>
            <p>
              Temukan panduan singkat mengenai penggunaan P.A.D.U.
            </p>
          </div>

          {/* QUICK GUIDE */}
          <section className="help-guide-section">
            <h2>Bagaimana P.A.D.U. bekerja?</h2>

            <div className="help-guide-grid">
              {guides.map((guide) => {
                const GuideIcon = guide.icon;

                return (
                  <article className="help-guide-card" key={guide.number}>
                    <div className="help-guide-top">
                      <span>{guide.number}</span>
                      <GuideIcon size={19} />
                    </div>

                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <section className="help-faq-section">
            <div className="help-faq-heading">
              <div>
                <h2>Pertanyaan Umum</h2>
                <p>Temukan jawaban atas pertanyaan seputar P.A.D.U.</p>
              </div>

              <div className="help-search">
                <Search size={17} />
                <input
                  type="search"
                  placeholder="Cari pertanyaan..."
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setOpenFaq(null);
                  }}
                />
              </div>
            </div>

            <div className="help-faq-list">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <article className="help-faq-item" key={faq.question}>
                    <button
                      type="button"
                      className="help-faq-question"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={isOpen ? "rotated" : ""}
                      />
                    </button>

                    {isOpen && (
                      <div className="help-faq-answer">
                        {faq.answer}
                      </div>
                    )}
                  </article>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div className="help-no-results">
                  Pertanyaan tidak ditemukan.
                </div>
              )}
            </div>
          </section>

          {/* BOTTOM ACTION */}
          <section className="help-bottom">
            <div className="help-bottom-icon">
              <Shield size={21} />
            </div>

            <div>
              <strong>Perlu melihat laporan Anda?</strong>
              <p>
                Periksa status dan perkembangan laporan melalui halaman
                Laporan Saya.
              </p>
            </div>

            <Link href="/laporan-saya" className="help-bottom-button">
              Laporan Saya
              <ChevronRight size={17} />
            </Link>
          </section>
        </div>
      </section>

      {/* MOBILE NAVIGATION */}
      <nav className="dashboard-mobile-nav">
        {menuItems.map((item) => {
          const ItemIcon = item.icon;

          return (
            <Link
              href={item.href}
              key={item.href}
              className={`mobile-menu-item ${
                item.href === "/bantuan" ? "selected" : ""
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
