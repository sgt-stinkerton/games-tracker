import {useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {entryService} from "../../services/entryService.js";
import SetTodayDate from "../SetTodayDate.jsx";

// todo make prettier
// todo error
// todo if you add one indiv rating, you should have to add all of them


export default function GameEditModal({ entry, setEntry, show, setShow, setToastMsg, setShowToast }) {
  const [error, setError] = useState(null);

  // form data
  const setInitForm = () => {
    return {
      reviewText: entry.reviewText || "",
      finishDate: entry.finishDate || "",
      enjoyment: entry.enjoyment ?? "",
      gameplay: entry.gameplay ?? "",
      story: entry.story ?? "",
      visuals: entry.visuals ?? "",
      sound: entry.sound ?? ""
    };
  };
  
  const [formData, setFormData] = useState(setInitForm());

  const isWithinCharLimit = formData.reviewText?.length <= 8192;
  
  // helper for ratings
  const formatScore = (val) => {
    if (val === "" || val === null || val === undefined) return null;
    return Number(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    formData.reviewText = formData.reviewText?.trim();
    if (!isWithinCharLimit) {
      setError("Review text must be less than 8192 characters.");
      return;
    }

    aggregateFormData();
  }

  const aggregateFormData = () => {
    const reviewData = {
      reviewText: formData.reviewText,
      finishDate: formData.finishDate,
      enjoyment: formatScore(formData.enjoyment),
      gameplay: formatScore(formData.gameplay),
      story: formatScore(formData.story),
      visuals: formatScore(formData.visuals),
      sound: formatScore(formData.sound)
    };

    executeUpdate(reviewData)
  };

  // call api services to create instances of entities
  const executeUpdate = (reviewData) => {
    console.log(reviewData);
    entryService.createReview(entry.id, reviewData)
      .then(() => {
        return entryService.getEntryByGameId(entry.game.id);
      })
      .then((freshEntry) => {
        setEntry(freshEntry);
        setShow(false);
        setToastMsg("Review created successfully!");
        setShowToast(true);
      })
      .catch(error => {
        setError(error);
      })
  };

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const EditScoreInput = ({ label, name }) => (
    <Form.Group as={Col} xs={6} md={4} className="mb-3">
      <Form.Label className="small fw-bold text-muted">{label}</Form.Label>
      <Form.Control
        type="number"
        min="0" max="10"
        className="bg-white"
        name={name}
        value={formData[name]}
        onChange={onFormChange}
      />
    </Form.Group>
  );

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Create Review</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <Form className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold text-primary m-0">Review & Ratings</h6>
          <div className="d-flex gap-2">
            <Form.Control
              type="date"
              name="finishDate"
              className="bg-white"
              value={formData.finishDate || ""}
              onChange={onFormChange}
              size="sm" style={{width: "140px"}}
            />
            <SetTodayDate handleInput={onFormChange} />
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Review Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="reviewText"
              className="bg-white"
              placeholder="Write your final thoughts..."
              value={formData.reviewText || ""}
              onChange={onFormChange}
            />

            <div className="text-muted small">
              {formData.reviewText.length}/8192 characters.
            </div>
          </Form.Group>

          <Row>
            <EditScoreInput label="Enjoyment" name="enjoyment" />
            <EditScoreInput label="Gameplay" name="gameplay" />
            <EditScoreInput label="Story" name="story" />
            <EditScoreInput label="Visuals" name="visuals" />
            <EditScoreInput label="Sound" name="sound" />
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  )
}