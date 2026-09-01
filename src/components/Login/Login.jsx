import { useState } from "react";
import Header from "../Header/Header";
import { LoginNavBar } from "../NavBar/NavBar.jsx";
import { Link } from "react-router-dom";
export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
    <>
      <Header>
        <LoginNavBar />
      </Header>
      <section className="auth">
        <h2 className="auth__title">Inicia sesión</h2>
        <form
          name="login-form"
          className="auth__form"

          onSubmit={handleSubmit}
        >
          <input
            className="auth__input"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            required
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="auth__input"
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            minLength="6"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="auth__button" type="submit">
            Inicia sesión
          </button>
        </form>
        <p className="auth__caption">
          ¿Aún no eres miembro?{" "}
          <Link to="/signup" className="auth__link">
            Registrate aquí
          </Link>
        </p>
      </section>
    </>
  );
}
