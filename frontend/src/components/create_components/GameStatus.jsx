import {useState} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {BookmarkPlus, Controller, CollectionPlay, Trophy, EyeSlash, XLg} from "react-bootstrap-icons";
import "../../App.css";

import CreateFormBase from "./CreateFormBase.jsx";
import FormTop from "./FormTop.jsx";
import FormAlert from "./FormAlert.jsx";

export default function GameStatus ({ prevStep, nextStep, handleInput, formData }) {
  const [error, setError] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(formData.status || "");

  const statuses = [
    { id: "TO_PLAY", icon: <BookmarkPlus size={24} />, desc: "Plan to play one day." },
    { id: "UP_NEXT", icon: <CollectionPlay size={24} />, desc: "Next in play queue." },
    { id: "PLAYING", icon: <Controller size={24} />, desc: "Currently playing." },
    { id: "COMPLETED", icon: <Trophy size={24} />, desc: "Finished the game." },
    { id: "DROPPED", icon: <XLg size={24} />, desc: "Stopped playing." },
    { id: "HIDDEN", icon: <EyeSlash size={24} />, desc: "Hide from lists." }
  ];

  const handleSelect = (statusId) => {
    setCurrentStatus(statusId);

    // creates fake event to update parent state
    handleInput({ target: { name: "status", value: statusId }});
  };

  const submitSection = (e) => {
    e.preventDefault();
    setError(null);

    if (!currentStatus || currentStatus === "") {
      setError("You must select a status.");
      return;
    }
    nextStep();
  }

  return (
    <CreateFormBase canPrev={prevStep} canNext={submitSection}>
      <FormTop title="Set Game Status" iconName="Clipboard" />
      <FormAlert error={error} defaultText={"Where are you at with this game?"} />

      <Card.Body className="p-3">
        <Row xs={1} md={2} className="g-3">
          {statuses.map((s) => {
            const isSelected = currentStatus === s.id;
            return (
              <Col key={s.id}>
                <div
                  role="button"
                  onClick={() => handleSelect(s.id)}
                  className={
                    `p-2 rounded border w-100 text-start d-flex align-items-center justify-content-start
                    ${isSelected 
                      ? "border-primary bg-primary-subtle text-primary" 
                      : "bg-secondary-subtle hover-shadow bg-light"
                    }`}
                  style={{ cursor: "pointer", transition: "all 0.15s ease" }}
                >
                  <div className="me-3 ms-1">{s.icon}</div>
                  <div>
                    <h5 className="fw-bold mb-0">{s.id.replace("_", " ")}</h5>
                    <p className={`small m-0 lh-sm small ${isSelected ? "text-primary-emphasis" : "text-muted" }`}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </CreateFormBase>
  );
}