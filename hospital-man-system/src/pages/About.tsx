import React from "react";
import { motion } from "framer-motion";
import { Globe, Award, Heart } from "lucide-react";

const About: React.FC = () => {
  const team = [
    {
      name: "Valentino Phiri",
      role: "Team Lead & Architecture",
      location: "Malawi, Africa",
      image: "/images/team_avatars_valentino_1771245611599.png",
    },
    {
      name: "Josephy",
      role: "AI Implementation & Strategy",
      location: "Malawi, Africa",
      image: "/images/team_avatars_general_1_1771245630438.png",
    },
    {
      name: "Keith",
      role: "Frontend & UI Design",
      location: "Malawi, Africa",
      image: "/images/team_avatars_general_1_1771245630438.png",
    },
    {
      name: "Nkosi",
      role: "Backend & Data Integrity",
      location: "Malawi, Africa",
      image: "/images/team_avatars_general_1_1771245630438.png",
    },
  ];

  return (
    <div style={{ backgroundColor: "#fff", animation: "fadeIn 0.8s ease-out" }}>
      {/* Vision Hero */}
      <section
        style={{
          padding: "6rem 2rem",
          textAlign: "center",
          background: "var(--text-main)",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: "clamp(2rem, 6vw, 3rem)",
              fontWeight: "800",
              marginBottom: "1.5rem",
            }}
          >
            Revolutionizing Healthcare from Malawi to the World
          </motion.h1>
          <p style={{ fontSize: "1.25rem", opacity: 0.8, lineHeight: "1.6" }}>
            MediCore AI was born out of a vision to bridge the gap in healthcare
            accessibility using state-of-the-art artificial intelligence and
            streamlined management systems.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section style={{ padding: "6rem 2rem" }}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "800",
                marginBottom: "1.5rem",
                color: "var(--text-main)",
              }}
            >
              Our Mission
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: "1.8",
                marginBottom: "1.5rem",
              }}
            >
              Based in the heart of Africa, we understand the unique challenges
              of healthcare delivery in diverse environments. Our mission is to
              provide clinicians with the tools they need to save lives,
              regardless of infrastructure limitations.
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                { icon: Globe, text: "Locally Inspired, Globally Ready" },
                { icon: Award, text: "Hackathon Excellence 2024" },
                { icon: Heart, text: "Patient-First Philosophy" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "var(--text-main)",
                    fontWeight: "600",
                  }}
                >
                  <div
                    style={{
                      padding: "8px",
                      backgroundColor: "#eff6ff",
                      borderRadius: "8px",
                      color: "var(--primary)",
                    }}
                  >
                    <item.icon size={20} />
                  </div>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "3rem",
              borderRadius: "32px",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                marginBottom: "1rem",
                color: "var(--primary)",
              }}
            >
              "Healthcare is a right, not a privilege."
            </div>
            <p style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
              — Valentino Phiri, Founder of MediCore AI
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                marginBottom: "1rem",
              }}
            >
              Meet The Team
            </h2>
            <p style={{ color: "var(--text-muted)" }}>
              The visionary minds behind the MediCore platform.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {team.map((member, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                style={{
                  backgroundColor: "#fff",
                  padding: "2rem",
                  borderRadius: "24px",
                  textAlign: "center",
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    backgroundColor: "var(--primary)",
                    color: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    fontSize: "2rem",
                    fontWeight: "800",
                    overflow: "hidden",
                    border: "4px solid var(--primary-light)",
                    position: "relative", // Added relative positioning
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <span style={{ position: "relative", zIndex: 1 }}>
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "800",
                    marginBottom: "0.5rem",
                  }}
                >
                  {member.name}
                </h3>
                <div
                  style={{
                    color: "var(--primary)",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  {member.role}
                </div>
                <div
                  style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}
                >
                  {member.location}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default About;
