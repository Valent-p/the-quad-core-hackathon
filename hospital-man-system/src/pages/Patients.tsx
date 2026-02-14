import React from "react";

const Patients: React.FC = () => {
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
        <h2 style={{ fontSize: "1.25rem" }}>Patient Management</h2>
        <button
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
            padding: "0.6rem 1.25rem",
            borderRadius: "8px",
            fontWeight: "500",
          }}
        >
          Add New Patient
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid var(--border)",
          overflow: "hidden",
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
                backgroundColor: "#fcfcfd",
              }}
            >
              <th style={{ padding: "1rem" }}>Patient Name</th>
              <th style={{ padding: "1rem" }}>Age/Gender</th>
              <th style={{ padding: "1rem" }}>Condition</th>
              <th style={{ padding: "1rem" }}>Status</th>
              <th style={{ padding: "1rem" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "1rem" }}>Patient {i}</td>
                <td style={{ padding: "1rem" }}>
                  {20 + i * 5} / {i % 2 === 0 ? "F" : "M"}
                </td>
                <td style={{ padding: "1rem" }}>Hypertension</td>
                <td style={{ padding: "1rem" }}>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "99px",
                      fontSize: "0.75rem",
                      backgroundColor: i % 2 === 0 ? "#dcfce7" : "#fef9c3",
                      color: i % 2 === 0 ? "#166534" : "#854d0e",
                    }}
                  >
                    {i % 2 === 0 ? "Stable" : "Critical"}
                  </span>
                </td>
                <td style={{ padding: "1rem" }}>
                  <button
                    style={{ color: "var(--primary)", background: "none" }}
                  >
                    View Records
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
