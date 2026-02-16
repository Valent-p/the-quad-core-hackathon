import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../api/storage";
import { motion } from "framer-motion";
import { Lock, Mail, ChevronRight } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("admin@hospital.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const doctors = storage.get<any[]>("doctors") || [];
    const user = doctors.find((d) => d.email === email);

    if (user && password === "password") {
      // Simplified password check for prototype
      storage.login(user);
      navigate("/dashboard");
    } else {
      setError(
        "Invalid email or password. Hint: admin@hospital.com / password",
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2.5rem",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              color: "var(--primary)",
              fontWeight: "bold",
              fontSize: "1.75rem",
              marginBottom: "0.5rem",
            }}
          >
            MediCore AI
          </div>
          <p style={{ color: "var(--text-muted)" }}>
            Sign in to your doctor dashboard
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
                fontSize: "0.875rem",
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={18}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  outline: "none",
                }}
                placeholder="name@hospital.com"
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
                fontSize: "0.875rem",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={18}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  outline: "none",
                }}
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div
              style={{
                color: "var(--danger)",
                fontSize: "0.875rem",
                marginBottom: "1.5rem",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "var(--primary)",
              color: "#fff",
              padding: "0.75rem",
              borderRadius: "10px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            Login <ChevronRight size={18} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
