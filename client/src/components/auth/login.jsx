import React, { useReducer, useState } from "react";
import { GptIcon, Google, Microsoft, BuzzIcon, BuzzLogin } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import FormFeild from "./FormFeild";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { insertUser } from "../../redux/user";
import instance from "../../config/instance";
import "./style.scss";

const reducer = (state, { type, status }) => {
  switch (type) {
    case "filled":
      return { filled: status };
    case "error":
      return { error: status, filled: state.filled };
    default:
      return state;
  }
};

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, stateAction] = useReducer(reducer, {
    filled: false,
    error: false,
  });

  const [formData, setFormData] = useState({
    email: "",
    pass: "",
    manual: true,
  });

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const googleAuth = useGoogleLogin({
    onSuccess: (response) => {
      formHandle(null, {
        manual: false,
        token: response.access_token,
      });
    },
  });

  const formHandle = async (e, googleData) => {
    e?.preventDefault();
    let res = null;
    try {
      res = await instance.get("/api/user/login", {
        params: googleData || formData,
      });
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.status === 422) {
        stateAction({ type: "error", status: true });
      }
    } finally {
      if (res?.data) {
        stateAction({ type: "error", status: false });
        dispatch(insertUser(res.data.data));
        navigate("/");
      }
    }
  };

  return (
    <div className="Contain">
      <div className="icon">
        <BuzzLogin />
      </div>

      <div>{!state.filled ? <h1>Bem-vindo de volta</h1> : <h1>Entrar</h1>}</div>

      {!state.filled ? (
        <div className="options">
          <form
            className="manual"
            onSubmit={(e) => {
              e.preventDefault();
              stateAction({ type: "filled", status: true });
            }}
          >
            <div>
              <FormFeild
                value={formData.email}
                name={"email"}
                label={"Email"}
                type={"email"}
                handleInput={handleInput}
              />
            </div>
            <div className="btns">
              <button type="submit">Continue</button>
            </div>
          </form>

          <div data-for="acc-sign-up-login">
            <span>
              Você não tem conta? <Link to={"/signup"}>Registrar-se</Link>
            </span>
          </div>

          <div className="extra">
            <div className="divide">
              <span>OU</span>
            </div>

            <div className="btns">
              <button onClick={googleAuth}>
                <Google /> Continue com o Google
              </button>
              <button>
                <Microsoft /> Continue com a conta Microsoft
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form className="Form" onSubmit={formHandle}>
          <div>
            <div className="email">
              <button
                type="button"
                onClick={() => {
                  stateAction({ type: "filled", status: false });
                }}
              >
                Editar
              </button>

              <FormFeild
                value={formData.email}
                name={"email"}
                type={"email"}
                isDisabled
              />
            </div>

            <div className="password">
              <FormFeild
                value={formData.pass}
                name={"pass"}
                label={"Senha"}
                type={"password"}
                handleInput={handleInput}
                error={state?.error}
              />
            </div>

            <div>
              {state?.error && (
                <div className="error">
                  <div>!</div> Email ou senha errados.
                </div>
              )}
            </div>
            <div className="btns">
              <button type="submit">Continue</button>
            </div>
          </div>
          <div data-for="acc-sign-up-login">
            <Link className="link-left" to={"/signup"}>
              Crie uma conta
            </Link>

            <Link className="link-right" to={"/forgot"}>
              Esqueceu a senha?
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginComponent;
