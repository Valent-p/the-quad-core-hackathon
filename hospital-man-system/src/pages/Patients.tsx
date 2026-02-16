import React, { useState, useEffect } from "react";
import { storage } from "../api/storage";
import type { Patient } from "../api/storage";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  X,
  Mic,
  MicOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState<Patient["status"]>("Stable");
  const [isListening, setIsListening] = useState(false);

  const startListening = (callback: (text: string) => void) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      callback(transcript);
    };

    recognition.start();
  };

  const loadPatients = () => {
    const data = storage.get<Patient[]>("patients") || [];
    setPatients(data);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatients = [...patients];

    if (editingPatient) {
      const index = newPatients.findIndex((p) => p.id === editingPatient.id);
      newPatients[index] = {
        ...editingPatient,
        name,
        age: parseInt(age),
        gender,
        condition,
        status,
        lastVisit: new Date().toISOString().split("T")[0],
      };
    } else {
      const newId = `p${Date.now()}`;
      newPatients.push({
        id: newId,
        name,
        age: parseInt(age),
        gender,
        condition,
        status,
        lastVisit: new Date().toISOString().split("T")[0],
        doctorManagedBy: storage.getSession()?.user.id || "d1",
      });
    }

    storage.set("patients", newPatients);
    setPatients(newPatients);
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this patient record?")) {
      const newPatients = patients.filter((p) => p.id !== id);
      storage.set("patients", newPatients);
      setPatients(newPatients);
    }
  };

  const openModal = (patient: Patient | null = null) => {
    if (patient) {
      setEditingPatient(patient);
      setName(patient.name);
      setAge(patient.age.toString());
      setGender(patient.gender);
      setCondition(patient.condition);
      setStatus(patient.status);
    } else {
      setEditingPatient(null);
      setName("");
      setAge("");
      setGender("Male");
      setCondition("");
      setStatus("Stable");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPatient(null);
  };

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ animation: "fadeIn 0.5s ease-out" }}>
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
            Patient Directory
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Manage and monitor all your patients in one place.
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
          <Plus size={18} /> Add New Patient
        </motion.button>
      </div>

      {/* Filters & Search */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          backgroundColor: "#fff",
          padding: "1rem",
          borderRadius: "12px",
          border: "1px solid var(--border)",
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <Search
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
            type="text"
            placeholder="Search patients by name or condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem 0.6rem 0.6rem 2.5rem",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              outline: "none",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--text-muted)",
          }}
        >
          <Filter size={18} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "0.6rem",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              outline: "none",
              backgroundColor: "#fff",
            }}
          >
            <option>All</option>
            <option>Stable</option>
            <option>Recovering</option>
            <option>Critical</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          border: "1px solid var(--border)",
          overflow: "hidden",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "1px solid var(--border)",
                backgroundColor: "#f8fafc",
              }}
            >
              <th
                style={{
                  padding: "1.25rem",
                  color: "var(--text-muted)",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                }}
              >
                Patient
              </th>
              <th
                style={{
                  padding: "1.25rem",
                  color: "var(--text-muted)",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                }}
              >
                Condition
              </th>
              <th
                style={{
                  padding: "1.25rem",
                  color: "var(--text-muted)",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: "1.25rem",
                  color: "var(--text-muted)",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                }}
              >
                Last Visit
              </th>
              <th
                style={{
                  padding: "1.25rem",
                  color: "var(--text-muted)",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  textAlign: "right",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((p) => (
              <tr
                key={p.id}
                style={{
                  borderBottom: "1px solid var(--border)",
                  transition: "background-color 0.2s",
                }}
              >
                <td style={{ padding: "1.25rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: "#eff6ff",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: "600" }}>{p.name}</div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {p.age}y • {p.gender}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "1.25rem" }}>
                  <div style={{ fontWeight: "500" }}>{p.condition}</div>
                </td>
                <td style={{ padding: "1.25rem" }}>
                  <span
                    style={{
                      padding: "0.4rem 0.75rem",
                      borderRadius: "99px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      backgroundColor:
                        p.status === "Stable"
                          ? "#dcfce7"
                          : p.status === "Recovering"
                            ? "#e0f2fe"
                            : "#fee2e2",
                      color:
                        p.status === "Stable"
                          ? "#166534"
                          : p.status === "Recovering"
                            ? "#0369a1"
                            : "#991b1b",
                    }}
                  >
                    {p.status}
                  </span>
                </td>
                <td
                  style={{
                    padding: "1.25rem",
                    color: "var(--text-muted)",
                    fontSize: "0.875rem",
                  }}
                >
                  {p.lastVisit}
                </td>
                <td style={{ padding: "1.25rem", textAlign: "right" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "0.5rem",
                    }}
                  >
                    <button
                      onClick={() => openModal(p)}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "6px",
                        background: "#f8fafc",
                        color: "var(--text-muted)",
                      }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "6px",
                        background: "#fee2e2",
                        color: "var(--danger)",
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredPatients.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    padding: "4rem",
                    textAlign: "center",
                    color: "var(--text-muted)",
                  }}
                >
                  No patients found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                backgroundColor: "#fff",
                width: "100%",
                maxWidth: "500px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
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
                  {editingPatient ? "Edit Patient" : "Add New Patient"}
                </h3>
                <button
                  onClick={closeModal}
                  style={{ background: "none", color: "var(--text-muted)" }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ gridColumn: "span 2" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Patient Name
                    </label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid var(--border)",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Age
                    </label>
                    <input
                      required
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Age"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid var(--border)",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid var(--border)",
                        outline: "none",
                        backgroundColor: "#fff",
                      }}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Medical Condition
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      required
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      placeholder="e.g. Hypertension"
                      style={{
                        width: "100%",
                        padding: "0.75rem 2.5rem 0.75rem 0.75rem",
                        borderRadius: "8px",
                        border: "1px solid var(--border)",
                        outline: "none",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        startListening((text) =>
                          setCondition((prev) =>
                            prev ? `${prev} ${text}` : text,
                          ),
                        )
                      }
                      style={{
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        padding: "4px",
                        color: isListening ? "var(--danger)" : "var(--primary)",
                        background: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>
                  </div>
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
                    Patient Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as Patient["status"])
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      outline: "none",
                      backgroundColor: "#fff",
                    }}
                  >
                    <option>Stable</option>
                    <option>Recovering</option>
                    <option>Critical</option>
                  </select>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      borderRadius: "10px",
                      border: "1px solid var(--border)",
                      background: "#fff",
                      fontWeight: "600",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      borderRadius: "10px",
                      background: "var(--primary)",
                      color: "#fff",
                      border: "none",
                      fontWeight: "600",
                    }}
                  >
                    {editingPatient ? "Update Patient" : "Register Patient"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Patients;
