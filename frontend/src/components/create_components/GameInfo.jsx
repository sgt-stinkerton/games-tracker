import CreateFormBase from "./CreateFormBase.jsx";
import {Card, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {gameService} from "../../services/gameService.js";
import FormTop from "./FormTop.jsx";
import FormAlert from "./FormAlert.jsx";

export default function GameInfo ({ nextStep, handleInput, formData }) {
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

  const isWithinCharLimit =
    formData.description.trim().length <= 350;

  const submitSection = (e) => {
    e.preventDefault();
    setError(null);

    if (formData.releaseYear && !Number.isInteger(parseInt(formData.releaseYear))) {
      setError("Release year must be a number.");
      return;
    }

    if (formData.releaseYear && parseInt(formData.releaseYear) < 1970) {
      setError("Release year must be after 1970.");
      return;
    }

    if (formData.title === "") {
      setError("You must enter a title.");
      return;
    }

    // cannot have the same title as an existing game
    const titleExists = existingTitles?.some(t => (
      t.toLowerCase() === formData.title.trim().toLowerCase()));
    if (titleExists) {
      setError(`Game with title '${formData.title}' already exists.`);
      return;
    }

    if (!isWithinCharLimit) {
      setError("Description must be less than 350 characters.");
      return;
    }

    formData.title = formData.title.trim();
    formData.description = formData.description?.trim();

    nextStep();
  }

  return (
    <CreateFormBase canNext={submitSection}>
      <FormTop title="Game Info" iconName="Controller" />
      <FormAlert error={error} />

      <Card.Body className="p-3">
        <Form onSubmit={submitSection}>
          <Form.Group className="mb-3">
            <Form.Label className="fs-5 mb-1 lh-1">Game Title <span className="text-danger">*</span></Form.Label>
            <Form.Control
              name="title"
              type="text"
              className="bg-white"
              value={formData.title}
              onChange={handleInput}
              placeholder="Enter game title..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-5 mb-1 lh-1">Release Year</Form.Label>
            <Form.Control
              name="releaseYear"
              type="text"
              className="bg-white"
              value={formData.releaseYear}
              onChange={handleInput}
              placeholder="Enter release year..."
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column flex-grow-1">
            <Form.Label className="fs-5 mb-1 lh-1">Short Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              className="bg-white flex-grow-1 border border-secondary"
              style={{ resize: "none", overflowY: "auto" }}
              value={formData.description}
              placeholder={"Enter a short description..."} // TODO (max 500 chars)
              onChange={handleInput}
            />

            <div className="text-muted small">
              {formData.description.length}/350 characters.
            </div>
          </Form.Group>
        </Form>
      </Card.Body>
    </CreateFormBase>
  );
}