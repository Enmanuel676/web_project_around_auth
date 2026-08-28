export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
  const { name, link, isLiked } = card;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="grid__card">
      <div className="card__image">
        <button
          aria-label="Delete card"
          className="card__delete"
          type="button"
          onClick={handleDeleteClick}
        />
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
