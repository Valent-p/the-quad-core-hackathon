import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AIAssistant from "../components/AIAssistant";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PublicLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Health Blog", path: "/blog" },
    { name: "About Us", path: "/about" },
  ];

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
          position: "sticky",
          top: 0,
          zIndex: 1000,
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

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  style={{ color: "var(--text-muted)", fontWeight: "500" }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
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

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-main)",
            cursor: "pointer",
          }}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              backgroundColor: "#fff",
              borderBottom: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <ul style={{ listStyle: "none", padding: "1rem 2rem" }}>
              {navLinks.map((link) => (
                <li key={link.path} style={{ marginBottom: "1rem" }}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      color: "var(--text-main)",
                      fontWeight: "600",
                      fontSize: "1.1rem",
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li style={{ marginTop: "1.5rem" }}>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "var(--primary)",
                    color: "#fff",
                    padding: "0.75rem",
                    borderRadius: "10px",
                    fontWeight: "600",
                  }}
                >
                  Portal Login
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .mobile-toggle { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .mobile-toggle { display: block; }
        }
      `}</style>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <AIAssistant />

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
