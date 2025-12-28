import {Button, Modal} from "react-bootstrap";

export default function GameDeleteModal({ show, setShow, title, handleDelete }) {
  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Delete Game?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete <strong>{title}</strong>?</p>
        <p className="text-muted small">
          This action is permanent. If you own this on Steam, consider setting it to <strong>HIDDEN</strong> instead to prevent it from reappearing during syncs.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete Permanently</Button>
      </Modal.Footer>
    </Modal>
  )
}