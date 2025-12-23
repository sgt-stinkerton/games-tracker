import CreateFormBase from "./CreateFormBase.jsx";
import {Card, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {gameService} from "../../services/gameService.js";
import FormTop from "./FormTop.jsx";

export default function GameInfo ({ nextStep, handleInput, formData }) {
  const [error, setError] = useState(null); // TODO
  const [existingTitles, setExistingTitles] = useState([]);

  // get existing titles so there are no exact duplicates
  useEffect(() => {
    gameService.getAllGames()
      .then(data => {
        const titles = data.map(g => g.title);
        setExistingTitles(titles);
      })
      .catch(error => setError(error))
  }, []);

  const submitSection = (e) => {
    e.preventDefault();
    setError(null);

    // todo validation of year

    if (formData.title === "") {
      setError("You must enter a title.");
      return;
    }

    // cannot have the same title as an existing game
    const titleExists = existingTitles?.some(t => (
      t.toLowerCase() === formData.title.trim().toLowerCase()));
    if (titleExists) {
      setError(`Game with title ${formData.title} already exists.`);
      return;
    }

    nextStep();
  }

  return (
    <CreateFormBase canNext={submitSection}>
      <FormTop title="Game Info" iconName="Controller" />
      <p className="m-0">{error}</p>
      <Card.Body className="p-2">
        <Form onSubmit={submitSection}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Release Year</Form.Label>
            <Form.Control
              name="releaseYear"
              type="text"
              value={formData.releaseYear}
              onChange={handleInput}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </CreateFormBase>
  );
}