import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  Shield,
  Cpu,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Zap,
  ChevronRight,
} from "lucide-react";

const Landing: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      {/* Hero Section */}
      <section
        style={{
          padding: "clamp(4rem, 10vw, 8rem) 2rem",
          textAlign: "center",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.9), rgba(239, 246, 255, 0.9)), url('/images/modern_hospital_tech_hero_1771245989203.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#dbeafe",
              color: "var(--primary)",
              padding: "0.5rem 1rem",
              borderRadius: "99px",
              fontSize: "0.875rem",
              fontWeight: "600",
              marginBottom: "2rem",
            }}
          >
            <Zap size={16} /> The Future of Healthcare is Here
          </div>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4rem)",
              fontWeight: "850",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
              background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Intelligent Hospital Management with MediCore AI
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 3vw, 1.25rem)",
              color: "var(--text-muted)",
              lineHeight: "1.6",
              marginBottom: "2.5rem",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
            }}
          >
            Empowering healthcare professionals with real-time AI insights,
            seamless patient handling, and integrated productivity tools.
          </p>
          <div
            className="hero-buttons"
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/login"
              style={{
                backgroundColor: "var(--primary)",
                color: "#fff",
                padding: "1rem 2.5rem",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.3)",
              }}
            >
              Launch Portal <ArrowRight size={20} />
            </Link>
            <Link
              to="/blog"
              style={{
                backgroundColor: "#fff",
                color: "var(--text-main)",
                padding: "1rem 2rem",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "1.1rem",
                border: "1px solid var(--border)",
              }}
            >
              Explore Blog
            </Link>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-5%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.05) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-5%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.05) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "50%",
          }}
        />
      </section>

      {/* Stats/Proof Section */}
      <section
        style={{
          padding: "4rem 2rem",
          backgroundColor: "#fff",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          {[
            {
              label: "Patient Recovery",
              value: "98.2%",
              sub: "AI-Optimized Plans",
            },
            {
              label: "Data Security",
              value: "Military",
              sub: "AES-256 Encryption",
            },
            { label: "Uptime", value: "99.99%", sub: "Enterprise Grade" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "clamp(2rem, 5vw, 2.5rem)",
                  fontWeight: "800",
                  color: "var(--primary)",
                  marginBottom: "0.5rem",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  marginBottom: "0.25rem",
                }}
              >
                {stat.label}
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "clamp(4rem, 8vw, 6rem) 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 2.5rem)",
                fontWeight: "800",
                marginBottom: "1rem",
              }}
            >
              Everything you need to lead
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
              A unified platform for modern healthcare excellence.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                icon: Activity,
                title: "Live Monitoring",
                desc: "Real-time vitals tracking with automated anomaly detection and alerting.",
              },
              {
                icon: Shield,
                title: "Compliance Ready",
                desc: "Fully HIPAA compliant data management with granular access controls.",
              },
              {
                icon: Cpu,
                title: "AI Diagnostics",
                desc: "Leverage advanced machine learning for faster, more accurate diagnostic prep.",
              },
              {
                icon: Stethoscope,
                title: "Telehealth Pro",
                desc: "Integrated HD video consultations with real-time charting capabilities.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                style={{
                  padding: "clamp(1.5rem, 4vw, 2.5rem)",
                  backgroundColor: "#fff",
                  borderRadius: "24px",
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#eff6ff",
                    color: "var(--primary)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <feature.icon size={24} />
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
                  {feature.desc}
                </p>
                <ul
                  style={{ listStyle: "none", marginTop: "1.5rem", padding: 0 }}
                >
                  {["Automated workflows", "Resource optimization"].map(
                    (item, j) => (
                      <li
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "0.875rem",
                          color: "var(--text-muted)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <CheckCircle2
                          size={14}
                          style={{ color: "var(--success)" }}
                        />{" "}
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "6rem 2rem",
          background: "var(--text-main)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 2.5rem)",
              fontWeight: "800",
              marginBottom: "1.5rem",
            }}
          >
            Ready to transform your clinic?
          </h2>
          <p
            style={{ opacity: 0.8, fontSize: "1.1rem", marginBottom: "2.5rem" }}
          >
            Join 500+ clinics already using MediCore AI to provide better
            patient care.
          </p>
          <Link
            to="/login"
            style={{
              display: "inline-flex",
              backgroundColor: "#fff",
              color: "var(--text-main)",
              padding: "1rem 2.5rem",
              borderRadius: "12px",
              fontWeight: "700",
              fontSize: "1.1rem",
              alignItems: "center",
              gap: "8px",
              maxWidth: "100%",
              justifyContent: "center",
            }}
          >
            Get Started Now <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .hero-buttons { flex-direction: column; width: 100%; }
          .hero-buttons a { width: 100% !important; justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default Landing;
