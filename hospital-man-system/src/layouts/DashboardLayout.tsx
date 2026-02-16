import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Wifi,
  WifiOff,
  AlertTriangle,
  X,
  Menu,
} from "lucide-react";
import { storage } from "../api/storage";

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const session = storage.getSession();
  const [isOnline, setIsOnline] = React.useState(true);
  const [showEmergency, setShowEmergency] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Simulate offline/online toggle for demo
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Small chance to toggle for the "sync" effect demo
      if (Math.random() > 0.95) setIsOnline((prev) => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    storage.logout();
    navigate("/login");
  };

  React.useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  React.useEffect(() => {
    // Close sidebar on navigation (mobile)
    setIsSidebarOpen(false);
  }, [location]);

  if (!session) return null;

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Patients", path: "/patients", icon: Users },
    { name: "Blog Posts", path: "/blog-admin", icon: FileText },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1999,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`dashboard-sidebar ${isSidebarOpen ? "open" : ""}`}
        style={{
          width: "260px",
          backgroundColor: "#fff",
          borderRight: "1px solid var(--border)",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 2000,
          transition: "transform 0.3s ease",
        }}
      >
        <div
          style={{
            marginBottom: "2rem",
            fontWeight: "bold",
            fontSize: "1.25rem",
            color: "var(--primary)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          MediCore AI
          <button
            className="mobile-close"
            onClick={() => setIsSidebarOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
            }}
          >
            <X size={20} />
          </button>
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
          onClick={() => setShowEmergency(true)}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem",
            backgroundColor: "var(--danger)",
            color: "#fff",
            borderRadius: "12px",
            marginBottom: "1rem",
            width: "100%",
            fontWeight: "700",
            boxShadow: "0 4px 6px -1px rgba(239, 68, 68, 0.4)",
          }}
        >
          <AlertTriangle size={20} style={{ marginRight: "12px" }} />
          RED ALERT
        </button>

        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem",
            color: "var(--danger)",
            background: "none",
            marginTop: "auto",
            width: "100%",
          }}
        >
          <LogOut size={20} style={{ marginRight: "12px" }} />
          Logout
        </button>
      </aside>

      {/* Emergency Modal */}
      {showEmergency && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              width: "90%",
              maxWidth: "500px",
              borderRadius: "24px",
              padding: "2rem",
              border: "4px solid var(--danger)",
            }}
          >
            <h2
              style={{
                color: "var(--danger)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <AlertTriangle size={32} /> EMERGENCY TRIAGE
            </h2>
            <p style={{ marginBottom: "1.5rem", fontWeight: "600" }}>
              Follow standard protocol for "Mass Casualty" or "Unknown Fever"
              (Malaria/Trauma Pattern):
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                "Airway & Breathing Check",
                "Severe Hemorrhage Control",
                "Rapid Diagnostic Test (RDT)",
                "Fluid Resuscitation Initiation",
              ].map((step, i) => (
                <label
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "1rem",
                    backgroundColor: "#fef2f2",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span style={{ fontWeight: "700" }}>{step}</span>
                </label>
              ))}
            </div>
            <button
              onClick={() => setShowEmergency(false)}
              style={{
                width: "100%",
                marginTop: "2rem",
                padding: "1rem",
                borderRadius: "12px",
                backgroundColor: "var(--text-main)",
                color: "#fff",
                fontWeight: "700",
              }}
            >
              CLOSE PROTOCOL
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <header
          style={{
            padding: "1.5rem 2rem",
            backgroundColor: "#fff",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              className="mobile-toggle"
              onClick={() => setIsSidebarOpen(true)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-main)",
                cursor: "pointer",
              }}
            >
              <Menu size={24} />
            </button>
            <h1 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
              Hospital Portal
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className="sync-status"
              style={{
                marginRight: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "0.5rem 1rem",
                borderRadius: "99px",
                backgroundColor: isOnline ? "#dcfce7" : "#fee2e2",
                color: isOnline ? "var(--success)" : "var(--danger)",
                fontSize: "0.7rem",
                fontWeight: "700",
              }}
            >
              {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
              <span className="sync-text">
                {isOnline ? "SYNCED" : "OFFLINE"}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div className="user-info" style={{ textAlign: "right" }}>
                <div style={{ fontWeight: "700", fontSize: "0.875rem" }}>
                  {session.user.name}
                </div>
                <div
                  style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                >
                  {session.user.specialization}
                </div>
              </div>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "var(--primary)",
                  overflow: "hidden",
                }}
              >
                {session.user.avatar ? (
                  <img
                    src={session.user.avatar}
                    alt={session.user.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  session.user.name.charAt(4)
                )}
              </div>
            </div>
          </div>
        </header>

        <section style={{ padding: "2rem" }}>
          <Outlet />
        </section>
      </main>

      <style>{`
        .mobile-toggle, .mobile-close { display: none; }
        
        @media (max-width: 1024px) {
          .dashboard-sidebar {
            position: fixed !important;
            transform: translateX(-100%);
          }
          .dashboard-sidebar.open {
            transform: translateX(0);
          }
          .mobile-toggle, .mobile-close { display: block; }
          .sync-text { display: none; }
          .user-info { display: none; }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
