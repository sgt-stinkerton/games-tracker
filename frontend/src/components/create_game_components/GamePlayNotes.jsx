import {Card, Form} from "react-bootstrap";
import CreateFormBase from "./CreateFormBase.jsx";
import FormTop from "./FormTop.jsx";

// todo update notes and review backend to have char limit of like 16000 or something idk (i need a lot...)

export default function GamePlayNotes ({ prevStep, nextStep, handleInput, formData }) {
  const submitSection = (e) => {
    e.preventDefault();

    // validation

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
              className="flex-grow-1 border border-secondary"
              style={{ resize: "none", overflowY: "auto" }}
              value={formData.notes}
              placeholder={"Enter any thoughts you've had whilst playing..."}
              onChange={handleInput}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </CreateFormBase>
  );
}