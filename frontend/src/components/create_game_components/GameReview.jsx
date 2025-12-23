import CreateFormBase from "./CreateFormBase.jsx";
import {Card, Form} from "react-bootstrap";
import FormTop from "./FormTop.jsx";

export default function GameReview ({ prevStep, nextStep, handleInput, formData }) {

  const submitSection = (e) => {
    e.preventDefault();

    // validation

    nextStep();
  }

  return (
    <CreateFormBase canPrev={prevStep} canNext={submitSection}>
      <FormTop title="Write Review" iconName="JournalText" />
      <Card.Body className="p-2">
        <Form onSubmit={submitSection}>
          <Form.Group>
            <Form.Label>Finish Date</Form.Label>
            <Form.Control
              type="date"
              name="finishDate"
              value={formData.finishDate}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="reviewText"
              value={formData.notes}
              onChange={handleInput}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </CreateFormBase>
  );
}