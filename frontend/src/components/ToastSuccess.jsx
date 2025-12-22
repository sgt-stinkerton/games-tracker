import {Toast, ToastContainer} from "react-bootstrap";
import {CheckCircleFill} from "react-bootstrap-icons";

// TODO make this also handle failure?

const ToastSuccess = ({ show, onClose, message }) => {

  return (
    <ToastContainer className="p-3" position="top-center" style={{ position: "fixed" }}>
      <Toast show={show} onClose={onClose} delay={3000} autohide
             className="shadow-lg d-flex justify-content-center w-auto"
             style={{ backgroundColor: "#3fa625" }}
      >
        <Toast.Body className="d-flex align-items-center gap-2 rounded-2 text-white">
          <CheckCircleFill />
          <strong className="me-auto fs-5">{message}</strong>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastSuccess;