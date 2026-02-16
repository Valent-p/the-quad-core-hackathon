import React, { useState, useEffect } from "react";
import { storage } from "../api/storage";
import type { BlogPost } from "../api/storage";
import { Plus, Edit2, Trash2, X, Tag, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BlogAdmin: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const loadPosts = () => {
    const data = storage.get<BlogPost[]>("blog_posts") || [];
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newPosts = [...posts];
    const session = storage.getSession();

    if (editingPost) {
      const index = newPosts.findIndex((p) => p.id === editingPost.id);
      newPosts[index] = {
        ...editingPost,
        title,
        content,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t !== ""),
      };
    } else {
      const newId = `b${Date.now()}`;
      newPosts.unshift({
        id: newId,
        title,
        content,
        authorId: session?.user.id || "d1",
        date: new Date().toISOString().split("T")[0],
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t !== ""),
        image: "/images/ai_medicine_black_doctor_1771245971791.png", // Default image for new posts for demo
      });
    }

    storage.set("blog_posts", newPosts);
    setPosts(newPosts);
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Permanently delete this blog post?")) {
      const newPosts = posts.filter((p) => p.id !== id);
      storage.set("blog_posts", newPosts);
      setPosts(newPosts);
    }
  };

  const openModal = (post: BlogPost | null = null) => {
    if (post) {
      setEditingPost(post);
      setTitle(post.title);
      setContent(post.content);
      setTags(post.tags.join(", "));
    } else {
      setEditingPost(null);
      setTitle("");
      setContent("");
      setTags("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "0.25rem",
            }}
          >
            Blog Management
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Publish and manage medical articles for your patients.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openModal()}
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
            padding: "0.75rem 1.25rem",
            borderRadius: "10px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Plus size={18} /> New Article
        </motion.button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            layout
            style={{
              backgroundColor: "#fff",
              padding: "1.5rem",
              borderRadius: "16px",
              border: "1px solid var(--border)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
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
              <div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    marginBottom: "0.5rem",
                  }}
                >
                  {post.title}
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    color: "var(--text-muted)",
                    fontSize: "0.875rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Calendar size={14} /> {post.date}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Tag size={14} /> {post.tags.join(", ")}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => openModal(post)}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "6px",
                    background: "#f8fafc",
                    color: "var(--text-muted)",
                    border: "none",
                  }}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "6px",
                    background: "#fee2e2",
                    color: "var(--danger)",
                    border: "none",
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p
              style={{
                color: "var(--text-muted)",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: "1.6",
              }}
            >
              {post.content}
            </p>
          </motion.div>
        ))}
        {posts.length === 0 && (
          <div
            style={{
              padding: "4rem",
              textAlign: "center",
              color: "var(--text-muted)",
              backgroundColor: "#fff",
              borderRadius: "16px",
              border: "1px dashed var(--border)",
            }}
          >
            No articles published yet. Click "New Article" to start blogging!
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2000,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              style={{
                backgroundColor: "#fff",
                width: "100%",
                maxWidth: "700px",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "1.5rem",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  {editingPost ? "Edit Article" : "Write New Article"}
                </h3>
                <button
                  onClick={closeModal}
                  style={{ background: "none", color: "var(--text-muted)" }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} style={{ padding: "2rem" }}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Article Title
                  </label>
                  <input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a catchy title..."
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      outline: "none",
                      fontSize: "1.1rem",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Tags (comma separated)
                  </label>
                  <input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. Health, Cardiology, Tips"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Content
                  </label>
                  <textarea
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your medical expertise..."
                    rows={8}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      outline: "none",
                      resize: "none",
                      lineHeight: "1.6",
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      flex: 1,
                      padding: "0.875rem",
                      borderRadius: "10px",
                      border: "1px solid var(--border)",
                      background: "#fff",
                      fontWeight: "600",
                    }}
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: "0.875rem",
                      borderRadius: "10px",
                      background: "var(--primary)",
                      color: "#fff",
                      border: "none",
                      fontWeight: "600",
                    }}
                  >
                    {editingPost ? "Update Article" : "Publish Article"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogAdmin;
