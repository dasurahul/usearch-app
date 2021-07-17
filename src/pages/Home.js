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
    </div>
  );
};

export default Home;
