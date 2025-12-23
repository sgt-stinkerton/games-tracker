import {useEffect, useState} from "react";
import {Col, Form, Card, Button} from "react-bootstrap";

export default function GameFormStatus ({ prevStep, handleInput, formData, handleSubmitForm }) {
  const [error, setError] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    // You can add validation logic here before moving to next step
    handleSubmitForm(e);
  };

  return(
    <Card>
      <Card.Body>
        <Card.Title>playing</Card.Title>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleInput}
            />
          </Form.Group>

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