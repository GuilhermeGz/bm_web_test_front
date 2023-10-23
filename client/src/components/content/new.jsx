import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Sun, Thunder, Warning } from "../../assets";
import { livePrompt } from "../../redux/messages";
import "./style.scss";

const New = memo(() => {
  const dispatch = useDispatch();
  return (
    <div className="New">
      <div>
        <h1 className="title currentColor">BuzzProject</h1>
      </div>

      <div className="flex">
        <div className="inner">
          <div className="card">
            <Sun />
            <h4 className="currentColor">Exemplos</h4>
          </div>

          <div
            className="card card-bg hover"
            onClick={() => {
              dispatch(livePrompt("Quais os posts mais engajados?"));
            }}
          >
            <p className="currentColor">"Quais os posts mais engajados?" →</p>
          </div>
        </div>

        <div className="inner">
          <div className="card">
            <Thunder />
            <h4 className="currentColor">Capacidades</h4>
          </div>

          <div className="card card-bg">
            <p className="currentColor">
              Busca e análise de postagens em redes sociais, incluindo
              Instagram, Facebook e Twitter.
            </p>
          </div>
        </div>

        <div className="inner">
          <div className="card">
            <Warning />
            <h4 className="currentColor">Limitações</h4>
          </div>

          <div className="card card-bg">
            <p className="currentColor">
              Os posts utilizados para as análises se restringem a 2023.
            </p>
          </div>

          <div className="card card-bg">
            <p className="currentColor">
              O período máximo a ser trabalhado é de 30 dias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default New;
