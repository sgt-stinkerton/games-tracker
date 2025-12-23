import {Button, Card, Col, Form} from "react-bootstrap";
import StarRating from "./StarRating.jsx";
import {useState} from "react";

export default function GameFormStatus ({ prevStep, handleInput, handleStarInput, formData, handleSubmitForm }) {
  const [error, setError] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    // You can add validation logic here before moving to next step
    handleSubmitForm(e);
  };

  const RatingRow = ({ name, type }) => (
    <Form.Group>
      <Form.Label column sm={3}>{name}</Form.Label>
      <StarRating type={type} defaultRating={formData[type]} getCurrentRating={handleStarInput} />
    </Form.Group>
  );

  return(
    <Card>
      <Card.Body>
        <Card.Title>Review</Card.Title>
        <Form onSubmit={submit}>

          <Form.Group>
            <Form.Label>ReviewNotes</Form.Label>
            <Form.Control
              as="textarea"
              name="reviewText"
              value={formData.reviewText}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group >
            <Form.Label>Finish Date</Form.Label>
            <Form.Control
              type="date"
              name="finishDate"
              value={formData.finishDate}
              onChange={handleInput}
            />
          </Form.Group>

          <RatingRow name="Enjoyment" type="enjoyment" />
          <RatingRow name="Gameplay" type="gameplay" />
          <RatingRow name="Story" type="story" />
          <RatingRow name="Visuals" type="visuals" />
          <RatingRow name="Sound" type="sound" />

          <Button variant="secondary" onClick={prevStep}>
            Back
          </Button>
          <Button variant="primary" type="submit">
            submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}