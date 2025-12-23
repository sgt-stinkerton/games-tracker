import {Button, Card, Col, Row} from "react-bootstrap";
import CreateFormBase from "./CreateFormBase.jsx";
import {useState} from "react";
import FormTop from "./FormTop.jsx";

export default function GameStatus ({ prevStep, nextStep, handleInput, formData }) {
  const [error, setError] = useState(null); // TODO
  const [currentStatus, setCurrentStatus] = useState(formData.status || "");

  const statuses = [
    "TO_PLAY", "UP_NEXT", "PLAYING",
    "COMPLETED", "DROPPED", "HIDDEN"
  ];

  const submitSection = (e) => {
    e.preventDefault();
    setError(null);

    if (!statuses.includes(currentStatus)) {
      setError("A status must be selected.");
      return;
    }

    nextStep();
  }

  return (
    <CreateFormBase canPrev={prevStep} canNext={submitSection}>
      <FormTop title="Set Game Status" iconName="Clipboard" />
      <p className="m-0">{error}</p>
      <Card.Body className="p-2">
        <Row md={2} className="g-3">
          {statuses.map(s => (
            <Col key={s}>
              <Button
                name="status"
                value={s}
                variant={currentStatus === s ? "primary" : "secondary"}
                className={`w-100 ${currentStatus === s ? "opacity-100 fw-bold" : "opacity-75"}`}
                onClick={(e) => {
                  setCurrentStatus(s);
                  handleInput(e);
                }}
              >
                {s.replace("_", " ")}
              </Button>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </CreateFormBase>
  );
}