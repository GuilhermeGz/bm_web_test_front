import React from "react";
import { GptIcon } from "../../assets";
import { BuzzIcon } from "../../assets";

import "./style.scss";

const Loading = () => {
  return (
    <div data-for="Loading">
      <div className="inner">
        <BuzzIcon />
        <div data-for="text">
          Por favor aguarde, a página está sendo carregada...
        </div>
      </div>
    </div>
  );
};

export default Loading;
