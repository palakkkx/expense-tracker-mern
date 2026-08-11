import React from "react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.avatar}>
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        <h1 style={styles.title}>My Profile</h1>
        <p style={styles.subtitle}>Manage your account information</p>

        <div style={styles.infoBox}>
          <div style={styles.row}>
            <span style={styles.label}>Name</span>
            <span style={styles.value}>
              {user.name || "User"}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Email</span>
            <span style={styles.value}>
              {user.email || "No email available"}
            </span>
          </div>
        </div>

        <button
          style={styles.logoutButton}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100%",
    padding: "40px",
    background: "#f5f7fb",
  },

  card: {
    maxWidth: "600px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
    textAlign: "center",
  },

  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: "700",
    margin: "0 auto 20px",
  },

  title: {
    margin: "0",
    fontSize: "28px",
    color: "#111827",
  },

  subtitle: {
    color: "#6b7280",
    marginTop: "8px",
    marginBottom: "30px",
  },

  infoBox: {
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    overflow: "hidden",
    textAlign: "left",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "18px 20px",
    borderBottom: "1px solid #e5e7eb",
  },

  label: {
    fontWeight: "600",
    color: "#6b7280",
  },

  value: {
    color: "#111827",
    fontWeight: "500",
  },

  logoutButton: {
    marginTop: "30px",
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Profile;