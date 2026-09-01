import { Link } from "react-router-dom";

export function RegisterNavBar() {
  return (
    <Link to="/signin" className="header__button header__button-register">
      Inicia sesión
    </Link>
  );
}

export function LoginNavBar() {
  return (
    <Link to="/signup" className="header__button header__button-login">
      Regístrate
    </Link>
  );
}

export function LogoutNavBar({ email, onSignOut }) {
  return (
    <>
      <p className="header__button header__button-email">{email}</p>
      <button
        className="header__button header__button-logout"
        onClick={onSignOut}
      >
        Cerrar sesión
      </button>
    </>
  );
}
