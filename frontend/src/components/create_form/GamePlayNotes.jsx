import {Card, Form} from "react-bootstrap";
import CreateFormBase from "./CreateFormBase.jsx";
import FormTop from "./FormTop.jsx";

export default function GamePlayNotes ({ prevStep, nextStep, handleInput, formData }) {
  const isWithinCharLimit =
    formData.notes.trim().length <= 1024;

  const submitSection = (e) => {
    e.preventDefault();

    if (!isWithinCharLimit) return;
    formData.notes = formData.notes?.trim();

    nextStep();
  }

  return (
    <CreateFormBase canPrev={prevStep} canNext={submitSection}>
      <FormTop title="Gameplay Notes" iconName="JournalText" />
      <Card.Body className="p-2 d-flex flex-column h-100">
        <Form onSubmit={submitSection} className="d-flex flex-column flex-grow-1">
          <Form.Group className="d-flex flex-column flex-grow-1">
            <Form.Control
              as="textarea"
              name="notes"
              className="bg-white flex-grow-1 border border-secondary"
              style={{ resize: "none", overflowY: "auto" }}
              value={formData.notes}
              placeholder={"Enter any thoughts you've had whilst playing..."}
              onChange={handleInput}
            />

            <div className={`small ${formData.notes.length > 1024 ? "text-danger" : "text-muted"}`}>
              {formData.notes.length}/1024 characters.
            </div>
          </Form.Group>
        </Form>
      </Card.Body>
    </CreateFormBase>
  );
}