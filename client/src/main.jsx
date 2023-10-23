import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";

// import { makeServer } from "../api/mirageServer"; // Importe aqui

// // Inicialize o servidor Mirage em ambiente de desenvolvimento
// if (import.meta.env.NODE_ENV === "development") {
//   console.log("aqui")
//   let server = makeServer()
//   server.get("/api/users", { users: [{ id: 1, name: "Bob" }] })
// }


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
