import {Toast, ToastContainer} from "react-bootstrap";
import {CheckCircleFill} from "react-bootstrap-icons";

const ToastSuccess = ({ show, onClose, message }) => {

  return (
    <ToastContainer className="p-2" position="top-center" style={{ position: "fixed" }}>
      <Toast show={show} onClose={onClose} delay={1500} autohide
             className="shadow-lg d-flex justify-content-center w-auto"
             style={{ backgroundColor: "#3fa625" }}
      >
        <Toast.Body className="d-flex align-items-center gap-2 rounded-2 text-white px-3 py-2">
          <CheckCircleFill size={20} />
          <strong className="me-auto" style={{ fontSize: "18px" }}>{message}</strong>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastSuccess;