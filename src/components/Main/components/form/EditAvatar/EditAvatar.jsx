import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext.js";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <form name="avatar-form" noValidate onSubmit={handleSubmit}>
      <input
        className="popup__input"
        type="url"
        name="avatar"
        placeholder="Ingrese la URL de la imagen"
        required
        ref={avatarRef}
      />
      <p className="popup__line"></p>
      <span className="popup__input_type_error" id="avatar-error"></span>
      <button className="popup__button_disabled" type="submit">
        Guardar
      </button>
    </form>
  );
}
