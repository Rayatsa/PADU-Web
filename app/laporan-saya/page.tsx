
"use client";

import { useState, type ReactNode } from "react";
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
  Search,
  Globe,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Server,
  X,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Buat Laporan", href: "/buat-laporan", icon: FilePlus },
  { label: "Laporan Saya", href: "/laporan-saya", icon: Folder },
  { label: "Bantuan", href: "/bantuan", icon: CircleHelp },
];

const reports = [
  {
    id: "PADU-001",
    category: "NCII / Konten Intim",
    domain: "example.com",
    url: "https://example.com/share/target-001",
    submission: "Sedang Ditinjau",
    accessibility: "Masih Dapat Diakses",
    created: "9 Nov 2026",
    checked: "Hari ini, 09:15 WIB",
    destination: "Kanal pengaduan resmi",
    method: "Panduan pengiriman",
    hosting: "Belum teridentifikasi",
    response: "Belum ada tanggapan terbaru.",
    activities: [
      {
        time: "09:15 WIB",
        title: "Pemeriksaan URL",
        description: "URL masih dapat diakses pada pemeriksaan terakhir.",
        type: "warning",
      },
      {
        time: "08:50 WIB",
        title: "Laporan ditinjau",
        description: "Laporan sedang dalam proses peninjauan.",
        type: "info",
      },
      {
        time: "08:30 WIB",
        title: "Laporan dibuat",
        description: "Informasi laporan berhasil disimpan.",
        type: "normal",
      },
    ],
  },
  {
    id: "PADU-002",
    category: "Sextortion",
    domain: "example.net",
    url: "https://example.net/report/target-002",
    submission: "Tanggapan Diterima",
    accessibility: "Tidak Dapat Diakses",
    created: "5 Nov 2026",
    checked: "5 Nov 2026, 14:00 WIB",
    destination: "Kanal pengaduan resmi",
    method: "Pengiriman terpandu",
    hosting: "Belum teridentifikasi",
    response: "Tanggapan telah diterima dari penerima laporan.",
    activities: [
      {
        time: "14:00 WIB",
        title: "Pemeriksaan URL",
        description: "URL tidak dapat diakses pada pemeriksaan terakhir.",
        type: "success",
      },
      {
        time: "12:30 WIB",
        title: "Tanggapan diterima",
        description: "Penerima memberikan tanggapan atas permohonan.",
        type: "info",
      },
      {
        time: "09:00 WIB",
        title: "Laporan dikirim",
        description: "Pengguna mengonfirmasi pengiriman laporan.",
        type: "normal",
      },
    ],
  },
  {
    id: "PADU-003",
    category: "NCII / Sextortion",
    domain: "example.org",
    url: "https://example.org/content/target-003",
    submission: "Menunggu Respons",
    accessibility: "Tidak Dapat Diperiksa",
    created: "3 Nov 2026",
    checked: "3 Nov 2026, 09:12 WIB",
    destination: "Kanal pengaduan resmi",
    method: "Pengiriman terpandu",
    hosting: "Belum teridentifikasi",
    response: "Belum ada respons dari penerima laporan.",
    activities: [
      {
        time: "09:12 WIB",
        title: "Pemeriksaan URL",
        description: "Akses URL belum dapat dipastikan.",
        type: "warning",
      },
      {
        time: "08:45 WIB",
        title: "Menunggu respons",
        description: "Permohonan masih menunggu tanggapan.",
        type: "info",
      },
      {
        time: "08:10 WIB",
        title: "Laporan dikirim",
        description: "Pengguna mengonfirmasi pengiriman laporan.",
        type: "normal",
      },
    ],
  },
];

export default function LaporanSayaPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("PADU-001");
  const [showDetail, setShowDetail] = useState(true);

  const filteredReports = reports.filter((report) => {
    const query = search.toLowerCase();
    return (
      report.id.toLowerCase().includes(query) ||
      report.domain.toLowerCase().includes(query) ||
      report.category.toLowerCase().includes(query)
    );
  });

  const selectedReport =
    filteredReports.find((report) => report.id === selectedId) ??
    filteredReports[0];

  function selectReport(id: string) {
    setSelectedId(id);
    setShowDetail(true);
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
                  item.href === "/laporan-saya" ? "selected" : ""
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
            <Shield size={15} />
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
            <span>Laporan Saya</span>
          </div>

          <div className="header-right">
            <div className="system-status">
              <span className="status-dot" />
              Prototype
            </div>

            <Link href="/bantuan" className="header-action" aria-label="Bantuan">
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

        <div className="reports-body">
          {/* PAGE HEADING */}
          <div className="reports-heading">
            <div>
              <div className="reports-title-row">
                <h1>Laporan Saya</h1>
                <span className="report-count">
                  {reports.length} Aduan Terdaftar
                </span>
              </div>
              <p>Pantau status dan perkembangan laporan Anda.</p>
            </div>

            <Link href="/buat-laporan" className="reports-create-button">
              <FilePlus size={17} />
              Buat Laporan
            </Link>
          </div>

          {/* SEARCH */}
          <div className="reports-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Cari ID atau domain..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {/* REPORT LIST AND DETAIL */}
          <div className="reports-layout">
            <section className="reports-list">
              {filteredReports.map((report) => (
                <button
                  type="button"
                  key={report.id}
                  onClick={() => selectReport(report.id)}
                  className={`report-list-card ${
                    selectedId === report.id ? "active" : ""
                  }`}
                >
                  <div className="report-card-heading">
                    <div className="report-symbol">
                      <Shield size={19} />
                    </div>

                    <div className="report-identity">
                      <strong>{report.id}</strong>
                      <span className="category-badge">
                        {report.category}
                      </span>
                      <small>
                        <Globe size={12} />
                        {report.domain}
                      </small>
                    </div>

                    <StatusBadge
                      type={
                        report.accessibility === "Masih Dapat Diakses"
                          ? "danger"
                          : report.accessibility === "Tidak Dapat Diakses"
                            ? "neutral"
                            : "warning"
                      }
                    >
                      {report.accessibility}
                    </StatusBadge>
                  </div>

                  <div className="report-card-footer">
                    <div>
                      <small>Status Permohonan</small>
                      <strong>
                        {report.submission}
                      </strong>
                    </div>

                    <div>
                      <small>Pemeriksaan Terakhir</small>
                      <strong>{report.checked}</strong>
                    </div>

                    <span className="report-open-link">
                      Lihat Detail →
                    </span>
                  </div>
                </button>
              ))}

              {filteredReports.length === 0 && (
                <div className="report-empty">
                  <Folder size={30} />
                  <strong>Laporan tidak ditemukan.</strong>
                  <span>Coba gunakan ID atau domain lain.</span>
                </div>
              )}
            </section>

            {/* DETAIL PANEL */}
            {selectedReport && showDetail && (
              <aside className="report-detail-panel">
                <div className="detail-header">
                  <div>
                    <strong>{selectedReport.id}</strong>
                    <span className="submission-badge">
                      {selectedReport.submission}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="detail-close"
                    onClick={() => setShowDetail(false)}
                    aria-label="Tutup detail"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="detail-category">
                  {selectedReport.category}
                </p>

                <div className="detail-status-box">
                  <div className="detail-status-item">
                    <small>Status Permohonan</small>
                    <StatusBadge type="info">
                      {selectedReport.submission}
                    </StatusBadge>
                  </div>

                  <div className="detail-status-item">
                    <small>Aksesibilitas URL</small>
                    <StatusBadge
                      type={
                        selectedReport.accessibility === "Masih Dapat Diakses"
                          ? "danger"
                          : selectedReport.accessibility === "Tidak Dapat Diakses"
                            ? "neutral"
                            : "warning"
                      }
                    >
                      {selectedReport.accessibility}
                    </StatusBadge>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>
                    <Globe size={16} />
                    Informasi Laporan
                  </h3>

                  <div className="detail-info-box">
                    <small>URL Sasaran</small>
                    <span className="detail-url">
                      {selectedReport.url}
                    </span>

                    <div className="detail-info-grid">
                      <div>
                        <small>Hosting</small>
                        <strong>{selectedReport.hosting}</strong>
                      </div>
                      <div>
                        <small>Tanggal Laporan</small>
                        <strong>{selectedReport.created}</strong>
                      </div>
                    </div>

                    <div className="detail-info-grid">
                      <div>
                        <small>Metode Pengiriman</small>
                        <strong>{selectedReport.method}</strong>
                      </div>
                      <div>
                        <small>Tujuan</small>
                        <strong>{selectedReport.destination}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>
                    <Activity size={16} />
                    Riwayat Monitoring
                  </h3>

                  <div className="monitor-timeline">
                    {selectedReport.activities.map((activity, index) => (
                      <div className="monitor-event" key={index}>
                        <div className={`timeline-dot ${activity.type}`} />
                        <div>
                          <div className="timeline-title">
                            <strong>{activity.title}</strong>
                            <span>{activity.time}</span>
                          </div>
                          <p>{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-response">
                  <Server size={17} />
                  <div>
                    <strong>Respons Penyedia Layanan</strong>
                    <p>{selectedReport.response}</p>
                  </div>
                </div>

                <p className="detail-disclaimer">
                  <Clock3 size={13} />
                  Data merupakan contoh prototype, bukan hasil pemeriksaan
                  atau respons platform secara langsung.
                </p>
              </aside>
            )}

            {!showDetail && selectedReport && (
              <button
                type="button"
                className="show-detail-button"
                onClick={() => setShowDetail(true)}
              >
                Lihat Detail {selectedReport.id}
              </button>
            )}
          </div>
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
                item.href === "/laporan-saya" ? "selected" : ""
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

function StatusBadge({
  children,
  type,
}: {
  children: ReactNode;
  type: "danger" | "neutral" | "warning" | "info";
}) {
  return (
    <span className={`report-status-badge ${type}`}>
      <span className="badge-dot" />
      {children}
    </span>
  );
}
