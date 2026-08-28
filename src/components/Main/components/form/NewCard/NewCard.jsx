import { useState } from "react";

export default function NewCard({ onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const isFormValid = name.length >= 2 && link.length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({ name, link });
  }

  return (
    <form name="card-form" noValidate onSubmit={handleSubmit}>
      <input
        className="popup__input"
        type="text"
        name="title"
        placeholder="Título"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p className="popup__line"></p>
      <span className="popup__input_type_error" id="title-error"></span>
      <input
        className="popup__input popup__input_content"
        type="url"
        name="url"
        placeholder="URL de la imagen"
        required
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <p className="popup__line"></p>
      <span className="popup__input_type_error" id="url-error"></span>
      <button
        className={isFormValid ? "popup__button_disabled" : "popup__button"}
        type="submit"
        disabled={!isFormValid}
      >
        Crear
      </button>
    </form>
  );
}
