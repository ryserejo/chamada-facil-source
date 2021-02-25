import React from "react";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import app from "../services/base";
import "../App.css";

function Login({ history }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const goLogin = (event) => {
    event.preventDefault();
    try {
      app.auth().signInWithEmailAndPassword(email, password).then(
        history.push("/"))
    } catch (error) {
      console.log(error);
      alert("Verifique se todos os seus dados estão corretos")
    }
  };

  return (
    <main>
      <h1>Olá?</h1>
      <form className="conatiner-login-form" onSubmit={goLogin}>
        <input
          onChange={(text) => setEmail(text.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(text) => setPassword(text.target.value)}
          type="password"
          placeholder="Senha"
        />
        <button type="submit">Entrar</button>
      </form>
      <p>
        Ou <Link to="/signin">crie uma nova conta.</Link>
      </p>
    </main>
  );
}

export default Login;
