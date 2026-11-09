
import Link from "next/link";
import {
  Shield,
  LayoutDashboard,
  Settings2,
  CircleHelp,
  UserRound,
  ChevronDown,
  Users,
  FolderOpen,
  Clock3,
  UserCheck,
  ArrowUpRight,
  FileCheck2,
  Activity,
  Bell,
} from "lucide-react";

const metrics = [
  {
    title: "Total Pengguna",
    value: "1.284",
    note: "Data demonstrasi",
    icon: Users,
    color: "default",
  },
  {
    title: "Total Laporan",
    value: "452",
    note: "Data demonstrasi",
    icon: FolderOpen,
    color: "default",
  },
  {
    title: "Laporan Sedang Diproses",
    value: "28",
    note: "Data demonstrasi",
    icon: Clock3,
    color: "primary",
  },
];

const activities = [
  {
    icon: UserCheck,
    text: "Akun pendamping baru menunggu verifikasi.",
    date: "09 Nov 2026, 10:15 WIB",
    color: "blue",
  },
  {
    icon: ArrowUpRight,
    text: "Laporan PADU-001 mengalami pembaruan status.",
    date: "09 Nov 2026, 09:45 WIB",
    color: "blue",
  },
  {
    icon: FileCheck2,
    text: "Informasi kanal pelaporan diperbarui.",
    date: "09 Nov 2026, 09:20 WIB",
    color: "gray",
  },
  {
    icon: Activity,
    text: "Pemeriksaan laporan PADU-002 dicatat.",
    date: "09 Nov 2026, 08:50 WIB",
    color: "blue",
  },
  {
    icon: FolderOpen,
    text: "Draf pengaduan baru tersimpan.",
    date: "09 Nov 2026, 08:30 WIB",
    color: "gray",
  },
];

export default function AdminDashboardPage() {
  return (
    <main className="admin-app">
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
          <Link href="/admin" className="admin-nav-link active">
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </Link>

          <Link href="/admin/manajemen" className="admin-nav-link">
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
            <span>Keluar</span>
          </Link>
        </div>
      </aside>

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

            <Link
              href="/bantuan"
              className="admin-header-icon"
              aria-label="Bantuan"
            >
              <CircleHelp size={19} />
            </Link>

            <Link
              href="/admin/manajemen"
              className="admin-header-icon"
              aria-label="Pengaturan"
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

        <div className="admin-content">
          <div className="admin-page-heading">
            <div>
              <h1>Dashboard Admin</h1>
              <p>Ringkasan pengguna, laporan, dan aktivitas sistem.</p>
            </div>

            <span className="admin-demo-label">
              DATA DEMONSTRASI
            </span>
          </div>

          <section className="admin-metrics">
            {metrics.map((metric) => {
              const MetricIcon = metric.icon;

              return (
                <article className="admin-metric-card" key={metric.title}>
                  <div className="admin-metric-top">
                    <span>{metric.title}</span>
                    <div className={`admin-metric-icon ${metric.color}`}>
                      <MetricIcon size={19} />
                    </div>
                  </div>

                  <strong className="admin-metric-value">
                    {metric.value}
                  </strong>

                  <span className="admin-metric-note">
                    {metric.note}
                  </span>
                </article>
              );
            })}
          </section>

          <section className="admin-activity-card">
            <div className="admin-activity-heading">
              <div>
                <Activity size={19} />
                <h2>Aktivitas Terbaru</h2>
              </div>
              <span className="admin-activity-label">
                Data contoh
              </span>
            </div>

            <div className="admin-activity-list">
              {activities.map((activity, index) => {
                const ActivityIcon = activity.icon;

                return (
                  <div className="admin-activity-row" key={index}>
                    <div className={`admin-activity-icon ${activity.color}`}>
                      <ActivityIcon size={16} />
                    </div>

                    <p>{activity.text}</p>

                    <span className="admin-activity-date">
                      <Clock3 size={13} />
                      {activity.date}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="admin-activity-footer">
              <span>
                <Shield size={14} />
                Riwayat aktivitas administrator
              </span>

              <Link href="/admin/manajemen">
                Buka Manajemen →
              </Link>
            </div>
          </section>
        </div>
      </section>

      <nav className="admin-mobile-nav">
        <Link href="/admin" className="active">
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </Link>
        <Link href="/admin/manajemen">
          <Settings2 size={19} />
          <span>Manajemen</span>
        </Link>
      </nav>
    </main>
  );
}
