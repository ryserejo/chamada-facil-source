import React, { useCallback } from "react";
import { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import app from "../services/base";
import "../App.css";

function SignIn({ history }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const goSignIn = (event) => {
    event.preventDefault();
    try {
      app.auth().createUserWithEmailAndPassword(email, password).then((user) =>{
        app.auth().currentUser.updateProfile({ displayName: name}).then(history.push("/"));
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <main>
      <h1>Olá?</h1>
      <form className="conatiner-login-form" onSubmit={goSignIn}>
        <input
          onChange={(text) => setName(text.target.value)}
          type="text"
          placeholder="Nome Completo"
        />
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
        <button type="submit">Cadastrar</button>
      </form>
      <p>
        Ou <Link to="/login">faça seu Login.</Link>
      </p>
    </main>
  );
}

export default SignIn;
