
import Image from "next/image";
import Link from "next/link";
import { Settings, ChevronDown } from "lucide-react";

type IconName =
  | "grid" | "file" | "folder" | "help"
  | "shield" | "user" | "settings" | "bell"
  | "link" | "document" | "send" | "arrow"
  | "lock" | "logout" | "headset";

function Icon({
  name,
  size = 20,
}: {
  name: IconName;
  size?: number;
}) {
  const base = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "grid":
      return <svg {...base}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case "file":
      return <svg {...base}><circle cx="12" cy="12" r="9"/><path d="M12 7v10M7 12h10"/></svg>;
    case "folder":
      return <svg {...base}><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>;
    case "help":
      return <svg {...base}><circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 4.6 1.4c-.8 1-2.2 1.3-2.2 3M12 17h.01"/></svg>;
    case "shield":
      return <svg {...base}><path d="M12 2.5 20 6v5.5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6z"/></svg>;
    case "user":
      return <svg {...base}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>;
    case "settings":
      return (
        <svg {...base}>
          <path d="M12.22 2h-.44a2 2 0 0 0-1.99 1.72l-.12.9a8 8 0 0 0-1.37.79l-.86-.36a2 2 0 0 0-2.47.91l-.22.38a2 2 0 0 0 .48 2.56l.72.57a8 8 0 0 0 0 1.58l-.72.57a2 2 0 0 0-.48 2.56l.22.38a2 2 0 0 0 2.47.91l.86-.36c.42.32.88.59 1.37.79l.12.9A2 2 0 0 0 11.78 22h.44a2 2 0 0 0 1.99-1.72l.12-.9c.49-.2.95-.47 1.37-.79l.86.36a2 2 0 0 0 2.47-.91l.22-.38a2 2 0 0 0-.48-2.56l-.72-.57a8 8 0 0 0 0-1.58l.72-.57a2 2 0 0 0 .48-2.56l-.22-.38a2 2 0 0 0-2.47-.91l-.86.36a8 8 0 0 0-1.37-.79l-.12-.9A2 2 0 0 0 12.22 2z" />
        <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "bell":
      return <svg {...base}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>;
    case "link":
      return <svg {...base}><path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.2 1.2M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.2-1.2"/></svg>;
    case "document":
      return <svg {...base}><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M13 2v7h7M8 13h8M8 17h8"/></svg>;
    case "send":
      return <svg {...base}><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>;
    case "arrow":
      return <svg {...base}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "lock":
      return <svg {...base}><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/></svg>;
    case "logout":
      return <svg {...base}><path d="M10 17l5-5-5-5M15 12H3M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/></svg>;
    case "headset":
      return <svg {...base}><path d="M3 13v-2a9 9 0 0 1 18 0v2M3 13h4v7H5a2 2 0 0 1-2-2zM21 13h-4v7h2a2 2 0 0 0 2-2z"/><path d="m12 10 2 2-2 2"/></svg>;
  }
}

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: "grid" as IconName },
  { label: "Buat Laporan", href: "/buat-laporan", icon: "file" as IconName },
  { label: "Laporan Saya", href: "/laporan-saya", icon: "folder" as IconName },
  { label: "Bantuan", href: "/bantuan", icon: "help" as IconName },
];

const steps = [
  {
    number: "1",
    icon: "link" as IconName,
    title: "Pengumpulan Informasi",
    description: "Isi informasi kejadian dan URL konten.",
  },
  {
    number: "2",
    icon: "document" as IconName,
    title: "Analisis & Telaah",
    description: "Periksa hasil analisis dan draf pengaduan.",
  },
  {
    number: "3",
    icon: "send" as IconName,
    title: "Persetujuan & Monitoring",
    description: "Setujui pengiriman dan pantau perkembangannya.",
  },
];

export default function DashboardPage() {
  return (
    <main className="dashboard-app">
      <aside className="dashboard-sidebar">
        <Link href="/dashboard" className="dashboard-brand">
          <div className="dashboard-brand-icon">
            <Icon name="shield" size={25} />
          </div>
          <div>
            <strong>P.A.D.U.</strong>
            <span>Platform Aduan Digital Terpadu</span>
          </div>
        </Link>

        <nav className="dashboard-nav">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`dashboard-nav-item ${
                item.href === "/dashboard" ? "selected" : ""
              }`}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-security">
            <Icon name="lock" size={16} />
            <span>Sesi Pengguna</span>
          </div>
          <Link href="/" className="sidebar-logout">
            <Icon name="logout" size={18} />
            Keluar
          </Link>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div className="breadcrumb-top">
            <strong>P.A.D.U.</strong>
            <span>/</span>
            <span>Dashboard</span>
          </div>

          <div className="header-right">
            <div className="system-status">
              <span className="status-dot" />
              Sistem Aktif
            </div>

            <Link href="/bantuan" className="header-action" aria-label="Bantuan">
              ?
            </Link>

            <Link
              href="/bantuan#pengaturan"
              className="header-action"
              aria-label="Pengaturan"
            >
              <Settings size={20} strokeWidth={1.8} color="#50576A" />
            </Link>

            <button className="user-menu">
              <span>Pengguna</span>
              <span className="user-avatar">
                <Icon name="user" size={17} />
              </span>
              <span className="dropdown-arrow" aria-hidden="true">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
    <path d="m6 9 6 6 6-6" />
  </svg>
</span>
            </button>
          </div>
        </header>

        <div className="dashboard-body">
          <div className="dashboard-breadcrumb">
            <span>PORTAL</span>
            <span>/</span>
            <strong>BERANDA DASHBOARD</strong>
          </div>

          <section className="welcome-hero">
            <div className="mascot-area">
              <Image
                src="/chibi.png"
                alt="Maskot P.A.D.U. dengan perisai"
                width={1024}
                height={1024}
                priority
                className="mascot-image"
              />
            </div>

            <div className="welcome-info">
              <div className="privacy-badge">
                <Icon name="shield" size={15} />
                Ruang Pelaporan Privat
              </div>

              <h1>Selamat datang di P.A.D.U.</h1>

              <p>
                Platform untuk membantu proses pelaporan dan penanganan
                konten intim tanpa persetujuan. Anda dapat memulai
                pelaporan dengan mudah melalui satu platform.
              </p>

              <div className="welcome-buttons">
                <Link href="/buat-laporan" className="welcome-primary">
                  <Icon name="file" size={18} />
                  Buat Laporan
                </Link>

                <Link href="/laporan-saya" className="welcome-secondary">
                  Lihat Laporan Saya
                  <Icon name="arrow" size={17} />
                </Link>
              </div>

              <div className="welcome-trust">
                <span>
                  <Icon name="shield" size={15} />
                  Privasi Pengguna
                </span>
                <i />
                <span>
                  <Icon name="lock" size={15} />
                  Akses Sesuai Peran
                </span>
              </div>
            </div>
          </section>

          <section className="how-section">
            <h2>Bagaimana P.A.D.U. bekerja?</h2>
            <p className="how-subtitle">
              Tiga langkah sederhana untuk memulai proses pelaporan.
            </p>

            <div className="how-cards">
              {steps.map((step) => (
                <article className="how-card" key={step.number}>
                  <div className="how-card-top">
                    <span className="step-number">{step.number}</span>
                    <span className="step-icon">
                      <Icon name={step.icon} size={21} />
                    </span>
                  </div>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="help-banner">
            <div className="help-icon">
              <Icon name="headset" size={22} />
            </div>

            <div className="help-text">
              <strong>Butuh bantuan?</strong>
              <span>Temukan panduan penggunaan P.A.D.U.</span>
            </div>

            <Link href="/bantuan" className="help-button">
              Hubungi Bantuan
              <Icon name="arrow" size={17} />
            </Link>
          </section>
        </div>
      </section>

      <nav className="dashboard-mobile-nav">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-menu-item ${
              item.href === "/dashboard" ? "selected" : ""
            }`}
          >
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
