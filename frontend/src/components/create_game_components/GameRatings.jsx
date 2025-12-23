import CreateFormBase from "./CreateFormBase.jsx";
import {Card, Form} from "react-bootstrap";
import StarRating from "../StarRating.jsx";
import FormTop from "./FormTop.jsx";

export default function GameRatings ({ prevStep, nextStep, handleInput, formData }) {

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