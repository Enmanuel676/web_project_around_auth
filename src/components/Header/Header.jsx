import logo from "../../../images/header-logo.png";

function Header() {
  return (
    <>
      <header className="header">
        <img src={logo} alt="Header-Logo" className="header__logo" />
        <p className="header__line"></p>
      </header>
    </>
  );
}

export default Header;
