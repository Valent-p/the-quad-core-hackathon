import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm MediBot, your AI health assistant. How can I help you today?",
      sender: "ai",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulated AI Logic
    setTimeout(() => {
      let aiText =
        "I'm not sure I understand. Could you rephrase that? I'm optimized to help with appointments, finding doctors, and general health info.";
      const lower = input.toLowerCase();

      if (lower.includes("appointment")) {
        aiText =
          "To schedule an appointment, please visit our 'Portal Login' or call us at (555) 012-3456.";
      } else if (lower.includes("doctor") || lower.includes("specialist")) {
        aiText =
          "We have experts in Cardiology, Neurology, and General Medicine. You can find their profiles in the Health Blog!";
      } else if (lower.includes("hello") || lower.includes("hi")) {
        aiText =
          "Hi there! How can I assist you with your health concerns today?";
      } else if (lower.includes("emergency")) {
        aiText =
          "If this is a medical emergency, please call 911 (or your local emergency number) immediately.";
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: aiText, sender: "ai" },
      ]);
    }, 1000);
  };

  return (
    <div
      style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 1000 }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              width: "350px",
              height: "500px",
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              marginBottom: "1rem",
              border: "1px solid var(--border)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "1rem",
                backgroundColor: "var(--primary)",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Bot size={24} />
                <span style={{ fontWeight: "600" }}>MediBot AI</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: "none", color: "#fff" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                padding: "1rem",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.sender === "ai" ? "flex-start" : "flex-end",
                    maxWidth: "80%",
                    padding: "0.75rem 1rem",
                    borderRadius:
                      msg.sender === "ai"
                        ? "0 12px 12px 12px"
                        : "12px 0 12px 12px",
                    backgroundColor:
                      msg.sender === "ai" ? "#f1f5f9" : "var(--primary)",
                    color: msg.sender === "ai" ? "var(--text-main)" : "#fff",
                    fontSize: "0.875rem",
                  }}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: "1rem",
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  outline: "none",
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  backgroundColor: "var(--primary)",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "var(--primary)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
};

export default AIAssistant;
