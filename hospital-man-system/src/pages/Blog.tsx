import React from "react";

const Blog: React.FC = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "3rem auto", padding: "0 2rem" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Health & Wellness Blog
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>
        Expert insights from our top medical professionals at MediCore AI.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {[1, 2, 3].map((i) => (
          <article
            key={i}
            style={{
              borderBottom: "1px solid var(--border)",
              paddingBottom: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1rem",
                color: "var(--primary)",
                fontWeight: "600",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              <span>Medical Insights</span>
              <span>•</span>
              <span style={{ color: "var(--text-muted)" }}>Feb 14, 2024</span>
            </div>
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "0.75rem",
                cursor: "pointer",
              }}
            >
              Advances in AI-Powered Diagnostics for Early Recognition
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat...
            </p>
            <button
              style={{
                color: "var(--primary)",
                fontWeight: "600",
                background: "none",
              }}
            >
              Read more →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
