export default function Popup(props) {
  const { onClose, title, children } = props;

  return (
    <div className="popup">
      <div className={`popup__form${!title ? " popup__form_type_image" : ""}`}>
        <button
          aria-label="Cerrar"
          className="popup__exit"
          type="button"
          onClick={onClose}
        />
        {title && <h2 className="popup__form_title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
