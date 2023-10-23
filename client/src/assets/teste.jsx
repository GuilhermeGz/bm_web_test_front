import React from "react";

const Graphic = ({ imageUrl, width, height, altText, title }) => {
  const imageStyle = {
    display: "block",
    margin: "0 auto",
    textAlign: "center", 
  };

  return (
    <div className="graphic-container">
      <h1 style={imageStyle} className="txt">{title}</h1>
      <img
        src={imageUrl}
        width={width}
        height={height}
        alt={altText}
        style={imageStyle}
      />
    </div>
  );
};

export default Graphic;
