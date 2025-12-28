import {useState} from "react";
import {Card, Form} from "react-bootstrap";

import CreateFormBase from "./CreateFormBase.jsx";
import FormTop from "./FormTop.jsx";
import FormAlert from "./FormAlert.jsx";
import StarRating from "../StarRating.jsx";

// TODO redo this section

export default function GameRatings ({ prevStep, nextStep, handleInput, formData }) {
  const [error, setError] = useState(null);

  const submitSection = (e) => {
    e.preventDefault();

    // validation

    nextStep();
  }

  const RatingRow = ({ name, type }) => (
    <Form.Group>
      <Form.Label>{name}</Form.Label>
      <StarRating type={type} defaultRating={formData[type]} getCurrentRating={handleInput} />
    </Form.Group>
  );

  return (
    <CreateFormBase canPrev={prevStep} canNext={submitSection}>
      <FormTop title="Rate Game" iconName="Star" />
      <FormAlert error={error} />

      <Card.Body className="p-2">
        <RatingRow name="Enjoyment" type="enjoyment" />
        <RatingRow name="Gameplay" type="gameplay" />
        <RatingRow name="Story" type="story" />
        <RatingRow name="Visuals" type="visuals" />
        <RatingRow name="Sound" type="sound" />
      </Card.Body>
    </CreateFormBase>
  );
}