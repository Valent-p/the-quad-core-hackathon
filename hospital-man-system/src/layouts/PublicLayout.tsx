import React from "react";
import { Link, Outlet } from "react-router-dom";

const PublicLayout: React.FC = () => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <header
        style={{
          backgroundColor: "#fff",
          borderBottom: "1px solid var(--border)",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            color: "var(--primary)",
          }}
        >
          MediCore AI
        </Link>
        <nav>
          <ul style={{ display: "flex", listStyle: "none", gap: "2rem" }}>
            <li>
              <Link to="/blog" style={{ color: "var(--text-muted)" }}>
                Health Blog
              </Link>
            </li>
            <li>
              <Link to="/about" style={{ color: "var(--text-muted)" }}>
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "#fff",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "6px",
                  fontWeight: "500",
                }}
              >
                Portal Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer
        style={{
          padding: "2rem",
          textAlign: "center",
          borderTop: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontSize: "0.875rem",
        }}
      >
        &copy; 2024 MediCore AI. Built for the Quad Core Hackathon.
      </footer>
    </div>
  );
};

export default PublicLayout;
