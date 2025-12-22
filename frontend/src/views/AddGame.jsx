import {useEffect, useState} from "react";
import {Form, Row, Col, Card, Button} from "react-bootstrap";
import {gameService} from "../services/gameService.js";

import CommonPageHeader from "../components/CommonPageHeader.jsx";

// todo add a button next to the date box that says today so you can quickly fill in if you finished it today
// todo genre stuff
// TODO finish date cannot be before game was released

export default function AddGame ({ setShowToast, setToastMsg }) {
  const [games, setGames] = useState(null);
  const [success, setSuccess] = useState(null); // TODO doesn't actually do anything
  const [error, setError] = useState(null); // TODO no alert shows

  const [formData, setFormData] = useState({
    title: "",
    releaseYear: "",
    status: "TO_PLAY",
    notes: "",
    reviewText: "",
    finishDate: "",
    rating: "",
    enjoyment: "",
    gameplay: "",
    story: "",
    visuals: "",
    sound: ""
  });

  const isDisabled = formData.status !== "COMPLETED" && formData.status !== "DROPPED";

  useEffect(() => {
    gameService.getAllGames()
      .then(data => setGames(data))
      .catch(error => setError(error))
  }, [success, error]);

  const handleValueChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // cannot have the same title as an existing game
    const titleExists = games?.some(g => (
      g.title.toLowerCase() === formData.title.trim().toLowerCase()
    ));
    if (titleExists) {
      setError("Game with this title already exists.");
      return;
    }

    aggregateData();
  }

  const aggregateData = () => {
    let gameData = {
      steamAppId: null,
      title: formData.title,
      releaseYear: parseInt(formData.releaseYear)
    }

    let entryData = {
      status: formData.status,
      notes: formData.status === "PLAYING" ? formData.notes : null,
      userId: 1,  // TODO need to get the user's id
      gameId: null
    }

    const scores = [formData.enjoyment, formData.gameplay,
      formData.story, formData.visuals, formData.sound];

    const getScore = (val) => val === "" ? 0 : Number(val);
    const sum = scores.reduce((a, c) => a + getScore(c), 0);
    const rating = sum / 5;

    let reviewData = {
      fullAchievements: null,  // TODO steam integration
      reviewText: formData.reviewText,
      finishDate: formData.finishDate,
      rating: rating,
      enjoyment: formData.enjoyment,
      gameplay: formData.gameplay,
      story: formData.story,
      visuals: formData.visuals,
      sound: formData.sound
    }

    executeCreate(gameData, entryData, reviewData);
  }

  const executeCreate = (gameData, entryData, reviewData) => {
    gameService.createGame(gameData)
      .then((newGame) => {
        entryData.gameId = Number(newGame.id);
        return gameService.createEntry(entryData);
      })
      .then((newEntry) => {
        if (["COMPLETED", "DROPPED"].includes(formData.status)) {
          return gameService.createReview(newEntry.id, reviewData);
        }
      })
      .then(() => {
        setSuccess(true);
        setToastMsg("Game Added Successfully")
        setShowToast(true);
      })
      .catch(error => setError(error))
  }

  const RatingRow = ({ label, name }) => (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={3} className="small fw-bold">{label}</Form.Label>
      <Col sm={9}>
        <Form.Control
          type="number"
          name={name}
          value={formData[name]}
          onChange={handleValueChange}
          min="0" max="10" step="0.5"
          required={isDisabled}
          disabled={isDisabled}
          className={`h-100 ${isDisabled ? "bg-secondary bg-opacity-25 border-0" : ""}`}
        />
      </Col>
    </Form.Group>
  );

  return (<>
    <CommonPageHeader title="Add Game" sideInfo="Manually Add Game and Entry Data" />

    {/* TODO add alerts */}

    <Form className="pt-2" onSubmit={handleSubmit}>
      <Row className="g-4">

        {/* left column — basic game and entry data */}
        <Col md={5} className="d-flex flex-column gap-4">

          {/* basic game data */}
          <Card className="bg-secondary-subtle">
            <Card.Body>
              <h6 className="fw-bold fs-5 mb-3">Game Details</h6>

              {/* game title */}
              <Form.Group className="row align-items-center mb-3">
                <Col md={2}>
                  <Form.Label className="fw-bold m-0">Title</Form.Label>
                </Col>
                <Col md={10}>
                  <Form.Control name="title" value={formData.title} onChange={handleValueChange} required />
                </Col>
              </Form.Group>

              {/* game release year */}
              <Form.Group className="row align-items-center mb-3">
                <Col md={2}>
                  <Form.Label className="fw-bold m-0">Year</Form.Label>
                </Col>
                <Col md={5}>
                  <Form.Control name="releaseYear" type="number" value={formData.releaseYear} onChange={handleValueChange} required/>
                </Col>
              </Form.Group>

              {/* user's current status */}
              <Form.Group className="row align-items-center">
                <Col md={2}>
                  <Form.Label className="fw-bold m-0">Status</Form.Label>
                </Col>
                <Col md={5}>
                  <Form.Select name="status" value={formData.status} onChange={handleValueChange} required>
                    <option value="TO_PLAY">TO PLAY</option>
                    <option value="UP_NEXT">UP NEXT</option>
                    <option value="PLAYING">PLAYING</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="DROPPED">DROPPED</option>
                    <option value="HIDDEN">HIDDEN</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Currently Playing Notes / Review Text */}
          <Card className="bg-secondary-subtle">
            <Card.Body>
              <h6 className="fw-bold fs-5 mb-3">
                {formData.status !== "COMPLETED" && formData.status !== "DROPPED"
                ? "Additional Gameplay Notes"
                : "Review Text"}
              </h6>

              {/* text area for notes / review text */}
              <Form.Group>
                <Form.Control
                  as="textarea"
                  className={`h-100 ${isDisabled && formData.status !== "PLAYING" ? "bg-secondary bg-opacity-25 border-0" : ""}`}
                  name="notes"
                  value={formData.notes}
                  onChange={handleValueChange}
                  placeholder={formData.status !== "PLAYING" && isDisabled
                    ? `Cannot include text when status is '${formData.status.toLowerCase().replace("_", " ")}'.`
                    : "Enter your thoughts..."}
                  disabled={formData.status !== "PLAYING" && isDisabled}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* right column - game review (for completed or dropped games) */}
        <Col md={7}>
          <Card className="bg-secondary-subtle">
            <Card.Body>
              <Row>
                <h6 className="fw-bold fs-5 mb-3">Ratings</h6>

                <RatingRow label="Enjoyment" name="enjoyment" />
                <RatingRow label="Gameplay" name="gameplay" />
                <RatingRow label="Story" name="story" />
                <RatingRow label="Visuals" name="visuals" />
                <RatingRow label="Sound" name="sound" />

                {/* date user finished game */}
                <Form.Group className="row align-items-center mb-3">
                  <Col md={3}>
                    <Form.Label className="fw-bold m-0">Finish Date</Form.Label>
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="date"
                      name="finishDate"
                      className={`h-100 ${isDisabled ? "bg-secondary bg-opacity-25 border-0" : ""}`}
                      value={formData.finishDate}
                      onChange={handleValueChange}
                      disabled={isDisabled}
                    />
                  </Col>
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-4">
        <Button type="submit" variant="primary" size="lg" className="px-5">
          Save Game
        </Button>
      </div>
    </Form>
  </>)
}