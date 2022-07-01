import ReactDOM from "react-dom";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%",
  width: "600px",
  maxWidth: "100%",
  height: "400px",
  maxHeight: "100%",
  backgroundColor: "lightYellow",
  zIndex: "999",
};

const Modal = ({ children, show }) => {
  console.log(show);
  return ReactDOM.createPortal(
    <>{show ? <div style={modalStyle}>{children}</div> : null}</>,
    document.getElementById("modal")
  );
};

export default Modal;
