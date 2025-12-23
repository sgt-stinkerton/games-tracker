import {useState, useEffect} from 'react';
import {gameService} from "../services/gameService.js";
import {Form, Button, Card, Col} from 'react-bootstrap';

import FilterTags from "./filter_components/FilterTags.jsx";

export default function GameFormBasic ({ nextStep, handleInput, formData, tags, setGameTags }) {
  const [error, setError] = useState(null);
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

  const submit = (e) => {
    e.preventDefault();
    // You can add validation logic here before moving to next step
    setError(null);

    // cannot have the same title as an existing game
    const titleExists = existingTitles?.some(t => (
      t.toLowerCase() === formData.title.trim().toLowerCase()));
    if (titleExists) {
      setError(`Game with title ${formData.title} already exists.`);
      return;
    }

    nextStep();
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Step 1: Basic Info</Card.Title>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Game Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInput}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Release Year</Form.Label>
            <Form.Control
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleInput}
            />
          </Form.Group>

          <FilterTags isDropdown={false} onFilterChange={setGameTags} initialState={tags} />

          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};