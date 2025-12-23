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
      <Card.Body className="p-2 d-flex flex-column h-100">
        <Form onSubmit={submitSection} className="d-flex flex-column flex-grow-1">
          <Form.Group>
            <Form.Label>Finish Date</Form.Label>
            <Form.Control
              type="date"
              name="finishDate"
              value={formData.finishDate}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column flex-grow-1">
            <Form.Label>Review Text</Form.Label>
            <Form.Control
              as="textarea"
              name="reviewText"
              className="flex-grow-1 border border-secondary"
              style={{ resize: "none", overflowY: "auto" }}
              value={formData.reviewText}
              placeholder={"Justify the ratings you gave previously..."}
              onChange={handleInput}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </CreateFormBase>
  );
}