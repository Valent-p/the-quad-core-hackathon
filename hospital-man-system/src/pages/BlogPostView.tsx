import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { storage } from "../api/storage";
import type { BlogPost, Doctor } from "../api/storage";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";

const BlogPostView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [author, setAuthor] = useState<Doctor | null>(null);

  useEffect(() => {
    const posts = storage.get<BlogPost[]>("blog_posts") || [];
    const foundPost = posts.find((p) => p.id === id);

    if (foundPost) {
      setPost(foundPost);
      const doctors = storage.get<Doctor[]>("doctors") || [];
      const foundAuthor = doctors.find((d) => d.id === foundPost.authorId);
      setAuthor(foundAuthor || null);
    }

    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h2>Post not found</h2>
        <button onClick={() => navigate("/blog")} style={{ marginTop: "1rem" }}>
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* Hero Header */}
      <section
        style={{ position: "relative", height: "500px", overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))",
          }}
        />
        <img
          src={post.image || "/images/hero-bg.jpg"}
          alt={post.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "4rem",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "800px",
            padding: "0 2rem",
            zIndex: 10,
            color: "#fff",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => navigate("/blog")}
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "99px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "2rem",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              <ArrowLeft size={18} /> Back to Blog
            </button>
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "850",
                lineHeight: "1.1",
                marginBottom: "1.5rem",
              }}
            >
              {post.title}
            </h1>
            <div
              style={{
                display: "flex",
                gap: "2rem",
                alignItems: "center",
                opacity: 0.9,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Calendar size={18} /> {post.date}
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Tag size={18} /> {post.tags.join(", ")}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <article
        style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 2rem" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "3rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid var(--primary-light)",
              }}
            >
              <img
                src={
                  author?.avatar ||
                  "/images/team-avatars-general-1_1771245630438.png"
                }
                alt={author?.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <div style={{ fontWeight: "700", color: "var(--text-main)" }}>
                By {author?.name || "MediCore Expert"}
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                {author?.specialization}
              </div>
            </div>
          </div>
          <button
            style={{
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Share2 size={20} /> Share
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: "1.25rem",
            lineHeight: "1.8",
            color: "#334155",
            whiteSpace: "pre-wrap",
          }}
        >
          {post.content}
        </motion.div>

        <div
          style={{
            marginTop: "4rem",
            padding: "3rem",
            backgroundColor: "#f8fafc",
            borderRadius: "32px",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "1rem", fontWeight: "800" }}>
            Want more insights?
          </h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
            Subscribe to our medical newsletter for the latest AI healthcare
            updates in Malawi.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            <input
              placeholder="Enter email"
              style={{
                flex: 1,
                padding: "0.75rem 1.25rem",
                borderRadius: "12px",
                border: "1px solid var(--border)",
                outline: "none",
              }}
            />
            <button
              style={{
                backgroundColor: "var(--primary)",
                color: "#fff",
                padding: "0.75rem 1.5rem",
                borderRadius: "12px",
                fontWeight: "600",
                border: "none",
              }}
            >
              JOIN
            </button>
          </div>
        </div>
      </article>

      <style>{`
        h1, h2, h3 { letter-spacing: -0.02em; }
      `}</style>
    </div>
  );
};

export default BlogPostView;
