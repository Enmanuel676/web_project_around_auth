import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header/Header.jsx";
import { LogoutNavBar } from "./NavBar/NavBar.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import * as auth from "../utils/auth.js";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(() =>
    Boolean(localStorage.getItem("jwt"))
  );
  const [userData, setUserData] = useState({ email: "" });
  const [tooltip, setTooltip] = useState(null);

  const handleLogin = ({ email, password }) => {
    return auth
      .signIn({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setUserData({ email });
        setIsLoggedIn(true);

        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setTooltip({
          isSuccess: false,
          message: "Uy, algo salió mal. Comprueba tu correo y tu contraseña.",
        });
      });
  };

  const handleRegister = ({ email, password }) => {
    return auth
      .signUp({ email, password })
      .then(() => {
        setTooltip({ isSuccess: true });
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setTooltip({ isSuccess: false });
      });
  };

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserData({ email: "" });
    navigate("/signin", { replace: true });
  }

  function handleCloseTooltip() {
    setTooltip(null);
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    auth
      .checkToken(jwt)
      .then((res) => {
        setUserData({ email: res.data.email });
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
      })
      .finally(() => {
        setIsCheckingToken(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([userInfo, cardsData]) => {
        setCurrentUser(userInfo);
        setCards(cardsData);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch(console.error);
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch(console.error);
  }

  if (isCheckingToken) {
    return <p className="page__loading">Cargando…</p>;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CurrentUserContext.Provider
                value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
              >
                <div className="page">
                  <Header>
                    <LogoutNavBar
                      email={userData.email}
                      onSignOut={handleSignOut}
                    />
                  </Header>
                  <Main
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                  <Footer />
                </div>
              </CurrentUserContext.Provider>
            </ProtectedRoute>
          }
        />

        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>

      {tooltip && (
        <InfoTooltip
          isSuccess={tooltip.isSuccess}
          message={tooltip.message}
          onClose={handleCloseTooltip}
        />
      )}
    </>
  );
}

export default App;
