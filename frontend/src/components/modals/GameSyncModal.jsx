import {Alert, Button, Col, Form, Modal, Row} from "react-bootstrap";
import {ExclamationTriangle, InfoCircle, ArrowRepeat} from "react-bootstrap-icons";
import {useState} from "react";

export default function GameSyncModal({ show, setShow, handleHardSync, handleSoftSync }) {
  const [error, setError] = useState(null);

  const handleSync = (isReset) => {
    // validation

    // document.getElementById('textbox_id').value

    const steamAppId = "1455840"; // temporary

    setShow(false);
    return isReset ? handleHardSync(steamAppId) : handleSoftSync(steamAppId);
  }

  const styles = `
    .custom-sync-modal {
      max-width: 600px;
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <Modal show={show} onHide={() => setShow(false)} centered dialogClassName="custom-sync-modal">
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center gap-2">
            <span className="fw-bold ms-2">Link Game to Steam</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4 py-3">
          <p>It looks like this game isn't linked via Steam! Paste the
            <strong> Steam App ID </strong>
            below to start tracking your achievements.</p>

          {/* input */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small text-uppercase mb-1">
              Enter Steam App ID
            </Form.Label>
            <Form.Control
              type="text"
              name="steamAppId"
              className="bg-white form-control-lg"
              placeholder="e.g. 1086940"
              maxLength={255}
            />
            <div className="text-muted mt-2 small lh-1">
              <InfoCircle size={12} className="me-1 mb-1" />
              <span>Found in the game's Steam page URL: <i>store.steampowered.com/app/<b>1086940</b>/...</i></span>
            </div>
          </Form.Group>

          <h6 className="fw-bold mb-3 border-bottom pb-2">Choose Linking Method</h6>
          <Row className="g-3">

            {/* soft link */}
            <Col sm={6}>
              <div className="h-100 p-3 rounded-3 border border-primary-subtle bg-primary-subtle">
                <div className="d-flex align-items-center gap-2 mb-1 text-primary">
                  <ArrowRepeat size={20} />
                  <span className="fw-bold">Link Only</span>
                </div>
                <p className="small m-0 text-muted">
                  <b>Fills in missing fields</b> only. Your custom title, image, description, and tags will remain unchanged.
                </p>
              </div>
            </Col>

            {/* hard link */}
            <Col sm={6}>
              <div className="h-100 p-3 rounded-3 border border-danger-subtle bg-danger-subtle">
                <div className="d-flex align-items-center gap-2 mb-1 text-danger">
                  <ExclamationTriangle size={20} />
                  <span className="fw-bold">Link & Reset</span>
                </div>
                <p className="small m-0 text-muted">
                  <b>Overwrites all game data</b> to match the game's Steam store page exactly. Useful if the current data is wrong.
                </p>
              </div>
            </Col>
          </Row>

          {/* footer info */}
          <Alert variant="secondary" className="mt-3 mb-0 py-2 d-flex align-items-center gap-2 text-muted border-0">
            <InfoCircle size={16} />
            <span className="small fst-italic">
            Your personal review, rating, and play notes are <strong>never</strong> affected.
          </span>
          </Alert>
        </Modal.Body>

        {/* buttons to confirm */}
        <Modal.Footer className="border-0 px-4 pb-4 pt-0 d-flex justify-content-between align-items-center">
          <Button variant="primary" className="px-4" onClick={() => handleSync(false)}>
            Link Only
          </Button>
          <Button variant="danger" className="px-4" onClick={() => handleSync(true)}>
            Link & Reset
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}