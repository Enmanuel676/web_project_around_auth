export default function ImagePopup({ card, onClose }) {
  return (
    <div className="image__card">
      <button
        className="image__close"
        type="button"
        aria-label="Cerrar imagen"
        onClick={onClose}
      />
      <img className="image__show" src={card.link} alt={card.name} />
      <p className="image__name">{card.name}</p>
    </div>
  );
}
