import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext.js";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name || "");
  const [description, setDescription] = useState(currentUser.about || "");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({ name, about: description });
  }

  return (
    <form name="profile-form" noValidate onSubmit={handleSubmit}>
      <input
        className="popup__input"
        type="text"
        name="name"
        placeholder="Nombre"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      />
      <p className="popup__line"></p>
      <span className="popup__input_type_error" id="name-error"></span>
      <input
        className="popup__input popup__input_content"
        type="text"
        name="description"
        placeholder="Acerca de mí"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
      />
      <p className="popup__line"></p>
      <span className="popup__input_type_error" id="description-error"></span>
      <button className="popup__button_disabled" type="submit">
        Guardar
      </button>
    </form>
  );
}
