import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const DashboardLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Patients", path: "/patients", icon: Users },
    { name: "Blog Posts", path: "/blog-admin", icon: FileText },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          backgroundColor: "#fff",
          borderRight: "1px solid var(--border)",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            marginBottom: "2rem",
            fontWeight: "bold",
            fontSize: "1.25rem",
            color: "var(--primary)",
          }}
        >
          MediCore AI
        </div>

        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: "none" }}>
            {navItems.map((item) => (
              <li key={item.path} style={{ marginBottom: "0.5rem" }}>
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    color:
                      location.pathname === item.path
                        ? "var(--primary)"
                        : "var(--text-muted)",
                    backgroundColor:
                      location.pathname === item.path
                        ? "#eff6ff"
                        : "transparent",
                    fontWeight: location.pathname === item.path ? "600" : "400",
                    transition: "all 0.2s",
                  }}
                >
                  <item.icon size={20} style={{ marginRight: "12px" }} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem",
            color: "var(--danger)",
            background: "none",
            marginTop: "auto",
          }}
        >
          <LogOut size={20} style={{ marginRight: "12px" }} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <header
          style={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Hospital Management
          </h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "1rem", textAlign: "right" }}>
              <div style={{ fontWeight: "500" }}>Dr. Valentino Phiri</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Cardiologist
              </div>
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#e2e8f0",
              }}
            ></div>
          </div>
        </header>

        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
