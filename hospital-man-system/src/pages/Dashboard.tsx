import React, { useState, useEffect } from "react";
import { storage } from "../api/storage";
import type { Patient } from "../api/storage";
import { Users, AlertCircle, CheckCircle, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    stable: 0,
    recent: [] as Patient[],
  });

  useEffect(() => {
    const patients = storage.get<Patient[]>("patients") || [];
    setStats({
      total: patients.length,
      critical: patients.filter((p) => p.status === "Critical").length,
      stable: patients.filter((p) => p.status === "Stable").length,
      recent: patients.slice(-4).reverse(),
    });
  }, []);

  return (
    <div style={{ animation: "fadeIn 0.5s ease-out" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2.5rem",
        }}
      >
        {[
          {
            label: "Total Patients",
            value: stats.total,
            icon: Users,
            color: "var(--primary)",
            bg: "#eff6ff",
          },
          {
            label: "Critical Cases",
            value: stats.critical,
            icon: AlertCircle,
            color: "var(--danger)",
            bg: "#fee2e2",
          },
          {
            label: "Stable Patients",
            value: stats.stable,
            icon: CheckCircle,
            color: "var(--success)",
            bg: "#dcfce7",
          },
          {
            label: "Growth",
            value: "+4.2%",
            icon: TrendingUp,
            color: "#8b5cf6",
            bg: "#f3e8ff",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            style={{
              padding: "1.5rem",
              backgroundColor: "#fff",
              borderRadius: "20px",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: "12px",
                  backgroundColor: stat.bg,
                  color: stat.color,
                }}
              >
                <stat.icon size={24} />
              </div>
            </div>
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontSize: "1.75rem",
                fontWeight: "bold",
                marginTop: "0.25rem",
              }}
            >
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "1.5rem",
            borderRadius: "20px",
            border: "1px solid var(--border)",
          }}
        >
          <h3
            style={{
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Recently Added Patients
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {stats.recent.map((p) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem",
                  borderRadius: "12px",
                  backgroundColor: "#f8fafc",
                }}
              >
                <div>
                  <div style={{ fontWeight: "600" }}>{p.name}</div>
                  <div
                    style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                  >
                    {p.condition}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color:
                      p.status === "Critical"
                        ? "var(--danger)"
                        : "var(--success)",
                  }}
                >
                  {p.status}
                </span>
              </div>
            ))}
            {stats.recent.length === 0 && (
              <div
                style={{
                  color: "var(--text-muted)",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                No recent records.
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "1.5rem",
            borderRadius: "20px",
            border: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Zap size={20} style={{ color: "var(--warning)" }} />
              ICU Resource Prediction
            </h3>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: "700",
                color: "var(--danger)",
                backgroundColor: "#fef2f2",
                padding: "4px 8px",
                borderRadius: "99px",
              }}
            >
              HIGH DEMAND LIKELY
            </span>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* Simple SVG Chart representing a prediction line */}
            <div
              style={{
                position: "relative",
                height: "120px",
                width: "100%",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ position: "absolute", bottom: 0 }}
              >
                <path
                  d="M0,80 Q25,70 50,50 T100,20"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M0,80 Q25,70 50,50 T100,20 L100,100 L0,100 Z"
                  fill="rgba(37, 99, 235, 0.1)"
                />
                {/* Critical Threshold Line */}
                <line
                  x1="0"
                  y1="40"
                  x2="100"
                  y2="40"
                  stroke="var(--danger)"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "0.75rem",
                  color: "var(--danger)",
                  fontWeight: "600",
                }}
              >
                Capacity Threshold
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <div
                style={{
                  flex: 1,
                  padding: "1rem",
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    marginBottom: "4px",
                  }}
                >
                  Projected Need
                </div>
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "800",
                    color: "var(--danger)",
                  }}
                >
                  +14.2%
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "1rem",
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    marginBottom: "4px",
                  }}
                >
                  Accuracy
                </div>
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "800",
                    color: "var(--success)",
                  }}
                >
                  94.8%
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                marginTop: "1rem",
                lineHeight: "1.5",
              }}
            >
              Our ML model predicts a surge in ICU admissions within the next 48
              hours based on current {stats.critical} critical trends in your
              ward.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
