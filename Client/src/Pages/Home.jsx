import { NavLink } from "react-router";

export default function Home() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f4f4f4",
          textAlign: "center",
          padding: "20px",
          overflow:"hidden"
        }}
      >
        {/* Header Text */}
        <h1
          style={{
            fontSize: "3rem",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Welcome to <span style={{ color: "#007bff" }}>Share It</span>
        </h1>
  
        {/* Subtitle */}
        <p
          style={{
            fontSize: "1.2rem",
            color: "#555",
            maxWidth: "600px",
            marginBottom: "20px",
          }}
        >
          The easiest and fastest way to share files securely. Upload, share, and collaborate in just a few clicks!
        </p>
  
        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "15px" }}>
          <NavLink to="/upload">
          <button
            style={{
              padding: "12px 24px",
              fontSize: "1rem",
              color: "white",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Upload Files
          </button>
          </NavLink>
          <button
            style={{
              padding: "12px 24px",
              fontSize: "1rem",
              color: "#007bff",
              backgroundColor: "transparent",
              border: "2px solid #007bff",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#007bff";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#007bff";
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    );
  }
  