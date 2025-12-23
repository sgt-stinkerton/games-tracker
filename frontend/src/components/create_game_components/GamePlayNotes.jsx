import {Card, Form} from "react-bootstrap";
import CreateFormBase from "./CreateFormBase.jsx";
import FormTop from "./FormTop.jsx";

export default function GamePlayNotes ({ prevStep, nextStep, handleInput, formData }) {
  const submitSection = (e) => {
    e.preventDefault();

    // validation

    nextStep();
  }

  return (
    <CreateFormBase canPrev={prevStep} canNext={submitSection}>
      <FormTop title="Gameplay Notes" iconName="Tag" />
      <Card.Body className="p-2">
        <Form onSubmit={submitSection}>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleInput}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </CreateFormBase>
  );
}