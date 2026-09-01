import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";

export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, isLiked } = card;
  const isOwn = card.owner === currentUser._id;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="grid__card">
      <div className="card__image">
        {isOwn && (
          <button
            aria-label="Delete card"
            className="card__delete"
            type="button"
            onClick={handleDeleteClick}
          />
        )}
        <img
          src={link}
          alt={name}
          className="grid__image"
          onClick={() => onImageClick(card)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <h3 className="grid__name">{name}</h3>
      <button
        aria-label="Like card"
        type="button"
        className={`grid__like${isLiked ? " grid__like_active" : ""}`}
        onClick={handleLikeClick}
      />
    </div>
  );
}
