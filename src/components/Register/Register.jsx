import { useState } from "react";
import { RegisterNavBar } from "../NavBar/NavBar.jsx";
import { Link } from "react-router-dom";
import Header from "../Header/Header.jsx";
export default function Register({ onRegister }) {
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
    onRegister({ email, password });
  }

  return (
    <>
      <Header>
        <RegisterNavBar />
      </Header>
      <section className="auth">
        <h2 className="auth__title">Regístrate</h2>
        <form
          name="register-form"
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
            Regístrate
          </button>
        </form>
        <p className="auth__caption">
          ¿Ya eres miembro?{" "}
          <Link to="/signin" className="auth__link">
            Inicia sesión aquí
          </Link>
        </p>
      </section>
    </>
  );
}
