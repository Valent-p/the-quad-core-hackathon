import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {[
          {
            label: "Total Patients",
            value: "1,284",
            change: "+12% from last month",
          },
          { label: "Appointments Today", value: "24", change: "8 pending" },
          { label: "Available Doctors", value: "12", change: "3 on break" },
          { label: "Critical Cases", value: "5", change: "-2% from yesterday" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              padding: "1.5rem",
              backgroundColor: "#fff",
              borderRadius: "12px",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: stat.change.includes("+")
                  ? "var(--success)"
                  : "var(--text-muted)",
              }}
            >
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid var(--border)",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>Recent Consultations</h3>
        <p style={{ color: "var(--text-muted)" }}>
          Feature placeholder: List of recent consultations will appear here.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
