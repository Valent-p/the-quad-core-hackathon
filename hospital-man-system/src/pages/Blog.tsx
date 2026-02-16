import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../api/storage";
import type { BlogPost } from "../api/storage";
import { Calendar, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = storage.get<BlogPost[]>("blog_posts") || [];
    setPosts(data);
  }, []);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "4rem auto",
        padding: "0 2rem",
        animation: "fadeIn 0.8s ease-out",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, var(--primary), #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          MediCore Health Blog
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "1.1rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Stay informed with the latest medical insights, healthy living tips,
          and AI innovations in healthcare.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2.5rem",
        }}
      >
        {posts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              backgroundColor: "#fff",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-10px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            {post.image && (
              <div
                style={{ width: "100%", height: "200px", overflow: "hidden" }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
            <div style={{ padding: "2rem", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "1.25rem",
                }}
              >
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      backgroundColor: "var(--primary-light)",
                      color: "var(--primary)",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "99px",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                  lineHeight: "1.4",
                }}
              >
                {post.title}
              </h2>

              <p
                style={{
                  color: "var(--text-muted)",
                  marginBottom: "1.5rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: "1.6",
                }}
              >
                {post.content}
              </p>
            </div>

            <div
              style={{
                padding: "1.5rem 2rem",
                borderTop: "1px solid var(--border)",
                backgroundColor: "#f8fafc",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                }}
              >
                <Calendar size={16} />
                {post.date}
              </div>
              <button
                onClick={() => navigate(`/blog/${post.id}`)}
                style={{
                  color: "var(--primary)",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Read Post <ChevronRight size={18} />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {posts.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "5rem",
            color: "var(--text-muted)",
          }}
        >
          <h3>No articles found.</h3>
          <p>Check back later for fresh content!</p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Blog;
