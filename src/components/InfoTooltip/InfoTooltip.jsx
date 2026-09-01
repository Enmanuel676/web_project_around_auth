import { useEffect } from "react";

const SUCCESS_MESSAGE = "¡Correcto! Ya estás registrado.";
const ERROR_MESSAGE = "Uy, algo salió mal. Por favor, inténtalo de nuevo.";

export default function InfoTooltip({ isSuccess, message, onClose }) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="tooltip" onClick={handleOverlayClick}>
      <div className="tooltip__container">
        <button
          className="tooltip__exit"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        />
        {isSuccess ? (
          <svg
            className="tooltip__icon"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="60" cy="60" r="55" fill="none" stroke="#48bb78" strokeWidth="8" />
            <path
              d="M38 61 L53 76 L83 46"
              fill="none"
              stroke="#48bb78"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            className="tooltip__icon"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="60" cy="60" r="55" fill="none" stroke="#ff0000" strokeWidth="8" />
            <path
              d="M42 42 L78 78 M78 42 L42 78"
              fill="none"
              stroke="#ff0000"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        )}
        <h2 className="tooltip__title">
          {message || (isSuccess ? SUCCESS_MESSAGE : ERROR_MESSAGE)}
        </h2>
      </div>
    </div>
  );
}
