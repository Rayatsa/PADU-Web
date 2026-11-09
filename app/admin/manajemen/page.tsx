
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  LayoutDashboard,
  Settings2,
  CircleHelp,
  UserRound,
  ChevronDown,
  Search,
  Download,
  Users,
  FolderOpen,
  Network,
  Activity,
  Clock3,
  Eye,
  X,
  CheckCircle2,
} from "lucide-react";

type TabKey = "users" | "reports" | "channels" | "logs";
type Tone = "blue" | "green" | "orange" | "red" | "gray";

type Cell = {
  text: string;
  tone?: Tone;
};

type ManagementRow = {
  id: string;
  title: string;
  subtitle: string;
  cells: Cell[];
};

const tabConfig: Record<
  TabKey,
  { label: string; icon: typeof Users; headers: string[]; filterOptions: string[] }
> = {
  users: {
    label: "Pengguna",
    icon: Users,
    headers: ["Identitas Akun", "Peran", "Status Akun", "Aksi"],
    filterOptions: [
      "Korban",
      "Pendamping",
      "Konselor",
      "Advokat",
      "Aktif",
      "Perlu Verifikasi",
      "Ditangguhkan",
    ],
  },
  reports: {
    label: "Laporan",
    icon: FolderOpen,
    headers: ["ID Laporan", "Kategori", "Tanggal", "Status", "Aksi"],
    filterOptions: [
      "NCII",
      "Sextortion",
      "Sedang Ditinjau",
      "Menunggu Respons",
      "Selesai",
    ],
  },
  channels: {
    label: "Kanal Pengaduan",
    icon: Network,
    headers: ["Nama Kanal", "Metode", "Integrasi", "Aksi"],
    filterOptions: [
      "API",
      "Formulir",
      "Email",
      "Tersedia",
      "Belum Terintegrasi",
    ],
  },
  logs: {
    label: "Log Aktivitas",
    icon: Activity,
    headers: ["Aktivitas", "Pelaku", "Waktu", "Aksi"],
    filterOptions: ["Pengguna", "Laporan", "Kanal", "Admin"],
  },
};

const managementData: Record<TabKey, ManagementRow[]> = {
  users: [
    {
      id: "USR-001",
      title: "Riana Citra (Pendamping LBH)",
      subtitle: "ID Pengguna: USR-001",
      cells: [
        { text: "Pendamping", tone: "blue" },
        { text: "Aktif", tone: "green" },
      ],
    },
    {
      id: "USR-002",
      title: "Anonim-8921",
      subtitle: "ID Pengguna: USR-002",
      cells: [
        { text: "Korban", tone: "gray" },
        { text: "Aktif", tone: "green" },
      ],
    },
    {
      id: "USR-003",
      title: "Sarah Maya (Konselor)",
      subtitle: "ID Pengguna: USR-003",
      cells: [
        { text: "Konselor", tone: "blue" },
        { text: "Perlu Verifikasi", tone: "orange" },
      ],
    },
    {
      id: "USR-004",
      title: "Dimas Raditya (Advokat)",
      subtitle: "ID Pengguna: USR-004",
      cells: [
        { text: "Advokat", tone: "gray" },
        { text: "Ditangguhkan", tone: "red" },
      ],
    },
  ],
  reports: [
    {
      id: "PADU-001",
      title: "PADU-001",
      subtitle: "Laporan pengguna",
      cells: [
        { text: "NCII", tone: "blue" },
        { text: "09 Nov 2026" },
        { text: "Sedang Ditinjau", tone: "orange" },
      ],
    },
    {
      id: "PADU-002",
      title: "PADU-002",
      subtitle: "Laporan pengguna",
      cells: [
        { text: "Sextortion", tone: "gray" },
        { text: "08 Nov 2026" },
        { text: "Menunggu Respons", tone: "orange" },
      ],
    },
    {
      id: "PADU-003",
      title: "PADU-003",
      subtitle: "Laporan pengguna",
      cells: [
        { text: "NCII", tone: "blue" },
        { text: "07 Nov 2026" },
        { text: "Selesai", tone: "green" },
      ],
    },
    {
      id: "PADU-004",
      title: "PADU-004",
      subtitle: "Laporan pengguna",
      cells: [
        { text: "Sextortion", tone: "gray" },
        { text: "06 Nov 2026" },
        { text: "Sedang Ditinjau", tone: "orange" },
      ],
    },
  ],
  channels: [
    {
      id: "CH-001",
      title: "Platform Penyedia A",
      subtitle: "Kanal pelaporan resmi",
      cells: [
        { text: "Formulir", tone: "gray" },
        { text: "Belum Terintegrasi", tone: "orange" },
      ],
    },
    {
      id: "CH-002",
      title: "Platform Penyedia B",
      subtitle: "Kanal pelaporan resmi",
      cells: [
        { text: "Email", tone: "gray" },
        { text: "Belum Terintegrasi", tone: "orange" },
      ],
    },
    {
      id: "CH-003",
      title: "Platform Penyedia C",
      subtitle: "Kanal pelaporan resmi",
      cells: [
        { text: "API", tone: "blue" },
        { text: "Tersedia", tone: "green" },
      ],
    },
    {
      id: "CH-004",
      title: "Platform Penyedia D",
      subtitle: "Kanal pelaporan resmi",
      cells: [
        { text: "Formulir", tone: "gray" },
        { text: "Belum Terintegrasi", tone: "orange" },
      ],
    },
  ],
  logs: [
    {
      id: "LOG-001",
      title: "Pembaruan status laporan",
      subtitle: "LOG-001",
      cells: [
        { text: "Admin", tone: "blue" },
        { text: "09 Nov 2026, 10:15 WIB" },
      ],
    },
    {
      id: "LOG-002",
      title: "Laporan baru dibuat",
      subtitle: "LOG-002",
      cells: [
        { text: "Pengguna", tone: "gray" },
        { text: "09 Nov 2026, 09:45 WIB" },
      ],
    },
    {
      id: "LOG-003",
      title: "Kanal pengaduan diperbarui",
      subtitle: "LOG-003",
      cells: [
        { text: "Admin", tone: "blue" },
        { text: "09 Nov 2026, 09:20 WIB" },
      ],
    },
    {
      id: "LOG-004",
      title: "Pemeriksaan laporan dicatat",
      subtitle: "LOG-004",
      cells: [
        { text: "Admin", tone: "blue" },
        { text: "09 Nov 2026, 08:50 WIB" },
      ],
    },
  ],
};

export default function AdminManagementPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("users");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState<ManagementRow | null>(null);

  const config = tabConfig[activeTab];
  const rows = managementData[activeTab];

  const filteredRows = rows.filter((row) => {
    const text = [
      row.id,
      row.title,
      row.subtitle,
      ...row.cells.map((cell) => cell.text),
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());
    const matchesFilter =
      !filter || row.cells.some((cell) => cell.text === filter);

    return matchesSearch && matchesFilter;
  });

  function changeTab(tab: TabKey) {
    setActiveTab(tab);
    setSearch("");
    setFilter("");
    setSelectedRow(null);
  }

  function exportData() {
    const headers = config.headers.slice(0, -1);
    const csvRows = [
      ["ID", ...headers],
      ...filteredRows.map((row) => [
        row.id,
        row.title,
        ...row.cells.map((cell) => cell.text),
      ]),
    ];

    const csv = csvRows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `PADU-${activeTab}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="admin-app">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand">
          <div className="admin-brand-icon">
            <Shield size={24} />
          </div>
          <div>
            <strong>P.A.D.U.</strong>
            <span>Platform Aduan Digital Terpadu</span>
          </div>
        </Link>

        <div className="admin-menu-label">MENU UTAMA</div>

        <nav className="admin-nav">
          <Link href="/admin" className="admin-nav-link">
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/manajemen"
            className="admin-nav-link active"
          >
            <Settings2 size={19} />
            <span>Manajemen</span>
          </Link>
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-session">
            <Shield size={14} />
            Sesi Administrator
          </div>
          <Link href="/" className="admin-logout">
            Keluar
          </Link>
        </div>
      </aside>

      {/* MAIN */}
      <section className="admin-main">
        <header className="admin-header">
          <div className="admin-breadcrumb">
            <strong>P.A.D.U.</strong>
            <span>/</span>
            <span>Portal Administrasi</span>
          </div>

          <div className="admin-header-right">
            <span className="admin-mode">
              <span />
              Mode Admin
            </span>

            <Link href="/bantuan" className="admin-header-icon">
              <CircleHelp size={19} />
            </Link>

            <Link
              href="/admin/manajemen"
              className="admin-header-icon"
            >
              <Settings2 size={19} />
            </Link>

            <button className="admin-profile" type="button">
              <span className="admin-avatar">
                <UserRound size={18} />
              </span>
              <span className="admin-profile-text">
                <strong>Superadmin P.A.D.U.</strong>
                <small>Administrator Sistem</small>
              </span>
              <ChevronDown size={15} />
            </button>
          </div>
        </header>

        <div className="management-content">
          {/* PAGE TITLE */}
          <div className="management-heading">
            <div>
              <h1>Manajemen</h1>
              <p>Kelola pengguna, laporan, dan kanal pengaduan.</p>
            </div>

            <div className="management-tools">
              <div className="management-search">
                <Search size={17} />
                <input
                  type="search"
                  placeholder="Cari entri administratif..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <select
                className="management-filter"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                aria-label="Filter kategori"
              >
                <option value="">Semua Kategori</option>
                {config.filterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="management-export"
                onClick={exportData}
              >
                <Download size={16} />
                Ekspor Data
              </button>
            </div>
          </div>

          {/* SUMMARY */}
          <section className="management-stats">
            <MetricCard
              icon={Users}
              title="Pengguna Terdaftar"
              value="1.248"
              note="Data demonstrasi"
            />
            <MetricCard
              icon={FolderOpen}
              title="Laporan Aktif"
              value="84"
              note="Data demonstrasi"
            />
            <MetricCard
              icon={Network}
              title="Kanal Pengaduan"
              value="12"
              note="Data demonstrasi"
            />
            <MetricCard
              icon={Activity}
              title="Log Aktivitas"
              value="48"
              note="Data demonstrasi"
            />
          </section>

          {/* TABS */}
          <div className="management-tabs">
            {(Object.keys(tabConfig) as TabKey[]).map((key) => {
              const TabIcon = tabConfig[key].icon;

              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => changeTab(key)}
                  className={`management-tab ${
                    activeTab === key ? "active" : ""
                  }`}
                >
                  <TabIcon size={17} />
                  <span>{tabConfig[key].label}</span>
                  <span className="tab-count">
                    {managementData[key].length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* TABLE */}
          <section className="management-table-card">
            <div className="management-table-heading">
              <div>
                <h2>{getTableTitle(activeTab)}</h2>
                <p>Data demonstrasi prototype P.A.D.U.</p>
              </div>

              <span className="demo-badge">Data Contoh</span>
            </div>

            <div className="management-table-scroll">
              <table className="management-table">
                <thead>
                  <tr>
                    {config.headers.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredRows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <div className="management-primary-cell">
                          <strong>{row.title}</strong>
                          <small>{row.subtitle}</small>
                        </div>
                      </td>

                      {row.cells.map((cell, index) => (
                        <td key={index}>
                          {cell.tone ? (
                            <span className={`management-pill ${cell.tone}`}>
                              <span />
                              {cell.text}
                            </span>
                          ) : (
                            <span className="management-cell-text">
                              {cell.text}
                            </span>
                          )}
                        </td>
                      ))}

                      <td>
                        <button
                          type="button"
                          className="management-detail-button"
                          onClick={() => setSelectedRow(row)}
                        >
                          <Eye size={14} />
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredRows.length === 0 && (
                    <tr>
                      <td
                        colSpan={config.headers.length}
                        className="management-empty"
                      >
                        Data tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="management-table-footer">
              <span>
                Menampilkan {filteredRows.length} dari {rows.length} entri
              </span>
              <span>Data demonstrasi</span>
            </div>
          </section>
        </div>
      </section>

      {/* DETAIL MODAL */}
      {selectedRow && (
        <div
          className="management-modal-backdrop"
          onClick={() => setSelectedRow(null)}
        >
          <div
            className="management-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="management-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="management-modal-header">
              <h2 id="management-modal-title">Detail Entri</h2>
              <button
                type="button"
                onClick={() => setSelectedRow(null)}
                aria-label="Tutup detail"
              >
                <X size={19} />
              </button>
            </div>

            <div className="management-modal-body">
              <small>ID Entri</small>
              <strong>{selectedRow.id}</strong>

              <small>Nama / Aktivitas</small>
              <strong>{selectedRow.title}</strong>

              <small>Informasi</small>
              <span>{selectedRow.subtitle}</span>

              {selectedRow.cells.map((cell, index) => (
                <div className="modal-detail-row" key={index}>
                  <span>Informasi {index + 1}</span>
                  <strong>{cell.text}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE NAV */}
      <nav className="admin-mobile-nav">
        <Link href="/admin">
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </Link>
        <Link href="/admin/manajemen" className="active">
          <Settings2 size={19} />
          <span>Manajemen</span>
        </Link>
      </nav>
    </main>
  );
}

function MetricCard({
  icon: Icon,
  title,
  value,
  note,
}: {
  icon: typeof Users;
  title: string;
  value: string;
  note: string;
}) {
  return (
    <article className="admin-management-metric">
      <div className="admin-management-metric-top">
        <span>{title}</span>
        <div>
          <Icon size={19} />
        </div>
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function getTableTitle(tab: TabKey) {
  const titles: Record<TabKey, string> = {
    users: "Direktori Pengguna & Pendamping",
    reports: "Pengelolaan Laporan",
    channels: "Kanal Pengaduan",
    logs: "Riwayat Log Aktivitas",
  };

  return titles[tab];
}
