import React from "react";

const btnDownload = () => {
  const containerStyle = {
    display: "block",
    margin: "0 auto",
    textAlign: "center",
  };

  const buttonStyle = {
    marginTop: "10px",
    backgroundColor: "#FA6500",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px", 
    cursor: "pointer",
    fontFamily: "Lato",
    fontSize: "16px"
  };

  return (
    <div style={containerStyle} className="graphic-container">
      <button style={buttonStyle}>Baixar Arquivo</button>
    </div>
  );
};

export default btnDownload;
