import {useEffect, useState} from "react";
import {Col, Form, Card, Button} from "react-bootstrap";

export default function GameFormStatus ({ nextStep, prevStep, handleInput, formData }) {
  const [error, setError] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    // You can add validation logic here before moving to next step
    nextStep();
  };

  return(
    <Card>
      <Card.Body>
        <Card.Title>Status</Card.Title>
        <Form onSubmit={submit}>
          <Form.Group>
            <Col md={2}>
              <Form.Label>Status</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Select name="status" value={formData.status} onChange={handleInput} required>
                <option value="TO_PLAY">TO PLAY</option>
                <option value="UP_NEXT">UP NEXT</option>
                <option value="PLAYING">PLAYING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="DROPPED">DROPPED</option>
                <option value="HIDDEN">HIDDEN</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Button variant="secondary" onClick={prevStep}>
            Back
          </Button>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}