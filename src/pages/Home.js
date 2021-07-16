import React, { useEffect } from "react";
import Header from "../components/Header";
import Form from "../components/Form";

const Home = () => {
  useEffect(() => {
    document.title = "Usearch";
  }, []);
  return (
    <div>
      <div style={{ marginTop: "80px", marginBottom: "40px" }}>
        <Header />
      </div>
      <Form />
      <h1
        style={{
          textAlign: "center",
          margin: "60px 0",
          marginBottom: "30px",
          color: "#333",
        }}
      >
        Your Entry Point to the World of Web Data
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          fontSize: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <i
            style={{ color: "var(--secondary-color)" }}
            className="fas fa-check-circle"
          ></i>{" "}
          <div>API Access</div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <i
            style={{ color: "var(--secondary-color)" }}
            className="fas fa-check-circle"
          ></i>{" "}
          <div>AI-Powered Search</div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <i
            style={{ color: "var(--secondary-color)" }}
            className="fas fa-check-circle"
          ></i>{" "}
          <div>Private Search</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
