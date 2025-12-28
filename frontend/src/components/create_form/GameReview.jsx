import CreateFormBase from "./CreateFormBase.jsx";
import {Card, Form} from "react-bootstrap";
import FormTop from "./FormTop.jsx";
import SetTodayDate from "../SetTodayDate.jsx";
import {useState} from "react";

// TODO charlimit error

export default function GameReview ({ prevStep, nextStep, handleInput, formData }) {
  const [error, setError] = useState(null);

  const isWithinCharLimit =
    formData.reviewText.trim().length <= 8192;

  const submitSection = (e) => {
    e.preventDefault();
    setError(null)

    if (!isWithinCharLimit) {
      setError("Review must be less than 8192 characters.");
      return;
    }

    formData.reviewText = formData.reviewText?.trim();

    nextStep();
  }

  return (
    <CreateFormBase canPrev={prevStep} canNext={submitSection}>
      <FormTop title="Write Review" iconName="JournalText" />
      <Card.Body className="pt-0 p-2 d-flex flex-column h-100">
        <Form onSubmit={submitSection} className="d-flex flex-column flex-grow-1">

          <Form.Group className="my-3 d-flex flex-row w-100">
            <div className="d-flex justify-content-evenly align-items-center w-100">
              <Form.Label className="fs-5 m-0 text-nowrap">Finish Date:</Form.Label>
              <Form.Control
                type="date"
                name="finishDate"
                value={formData.finishDate}
                onChange={handleInput}
                className="bg-white"
                style={{ maxWidth: "160px" }}
              />
              <SetTodayDate handleInput={handleInput} />
            </div>
          </Form.Group>

          <Form.Group className="d-flex flex-column flex-grow-1">
            <Form.Control
              as="textarea"
              name="reviewText"
              className="bg-white flex-grow-1 border border-secondary"
              style={{ resize: "none", overflowY: "auto" }}
              value={formData.reviewText}
              placeholder={"Justify your ratings..."}
              onChange={handleInput}
            />

            <div className="text-muted small">
              {formData.reviewText.length}/8192 characters.
            </div>
          </Form.Group>
        </Form>
      </Card.Body>
    </CreateFormBase>
  );
}