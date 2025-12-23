import {useEffect, useState} from "react";
import {Col, Form, Card, Button} from "react-bootstrap";

export default function GameFormStatus ({ prevStep, handleSubmitForm }) {
  const [error, setError] = useState(null);

  return(
    <Card>
      <Card.Body>
        <Card.Title>confirm</Card.Title>
        <Button variant="secondary" onClick={prevStep}>
          Back
        </Button>
        <Button variant="primary" onClick={handleSubmitForm}>
          submit
        </Button>
      </Card.Body>
    </Card>
  )
}