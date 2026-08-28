import { useState, useContext } from "react";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/form/NewCard/NewCard.jsx";
import EditProfile from "./components/form/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/form/EditAvatar/EditAvatar.jsx";
import Card from "./components/Card/Card.jsx";
import ImagePopup from "./components/ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Main({
  onOpenPopup,
  onClosePopup,
  popup,
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [selectedCard, setSelectedCard] = useState(null);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };
  const editProfilePopup = {
    title: "Editar Perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = { title: "Editar Avatar", children: <EditAvatar /> };

  function handleCardImageClick(card) {
    setSelectedCard(card);
  }

  function handleImageClose() {
    setSelectedCard(null);
  }

  return (
    <>
      <main className="main">
        <div className="profile">
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt="Avatar de perfil"
            onClick={() => onOpenPopup(editAvatarPopup)}
            style={{ cursor: "pointer" }}
          />
          <div className="profile__info">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button
              className="profile__info-link"
              type="button"
              onClick={() => onOpenPopup(editProfilePopup)}
            ></button>
            <p className="profile__info-description">{currentUser.about}</p>
          </div>
          <button
            className="profile__info_add"
            type="button"
            onClick={() => onOpenPopup(newCardPopup)}
          ></button>
        </div>

        <div className="grid">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onImageClick={handleCardImageClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </div>
      </main>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}

      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={handleImageClose} />
      )}
    </>
  );
}
export default Main;
