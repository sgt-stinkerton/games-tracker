import {useEffect, useState} from "react";
import {gameService} from "../services/gameService.js";
import {entryService} from "../services/entryService.js";
import {Container, ProgressBar} from "react-bootstrap";

import GameFormBasic from "./GameFormBasic.jsx";
import GameFormStatus from "./GameFormStatus.jsx";
import GameFormPlaying from "./GameFormPlaying.jsx";
import GameFormReview from "./GameFormReview.jsx";
import Confirmation from "./Confirmation.jsx";

export default function MultiPartGameForm ({ setSuccess }) {
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [gameTags, setGameTags] = useState([]);

  // baseline return data
  const [formData, setFormData] = useState({
    title: "", releaseYear: "", tags: "",
    status: "TO_PLAY", notes: "",
    reviewText: "", finishDate: "", rating: "",
    enjoyment: "", gameplay: "", story: "", visuals: "", sound: ""
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleFormChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (type, value) => {
    setFormData(prev => ({ ...prev, [type]: value }))
  }

  // verifying data on form submission
  const handleSubmitForm = (e) => {
    e.preventDefault();
    aggregateFormData();
  };

  // set up request bodies for sending to backend
  const aggregateFormData = () => {
    const gameData = {
      title: formData.title,
      releaseYear: formData.releaseYear !== "" ? parseInt(formData.releaseYear) : null,
      tags: gameTags
    };

    const entryData = {
      status: formData.status,
      notes: formData.status === "PLAYING" ? formData.notes : null,
      userId: 1,
      gameId: null
    };

    const getScore = val => val === "" ? 0 : Number(val);
    const scores = [formData.enjoyment, formData.gameplay, formData.story, formData.visuals, formData.sound];
    const sum = scores.reduce((a, c) => a + getScore(c), 0);
    const rating = sum / 5;

    const reviewData = {
      reviewText: formData.reviewText,
      finishDate: formData.finishDate,
      rating: rating,
      enjoyment: formData.enjoyment,
      gameplay: formData.gameplay,
      story: formData.story,
      visuals: formData.visuals,
      sound: formData.sound
    };

    executeCreate(gameData, entryData, reviewData)
  };

  // call api services to create instances of entities
  const executeCreate = (gameData, entryData, reviewData) => {
    gameService.createGame(gameData)
      .then((newGame) => {
        entryData.gameId = Number(newGame.id);
        return entryService.createEntry(entryData);
      })
      .then((newEntry) => {
        if (["COMPLETED", "DROPPED"].includes(formData.status)) {
          return entryService.createReview(newEntry.id, reviewData);
        }
      })
      .then(() => setSuccess(true))
      .catch(error => setError(error))
  };

  switch (step) {
    case 1:
      return (
        <Container className="mt-5">
          {/* Optional: Add a progress bar */}
          <ProgressBar now={33} label="Step 1" className="mb-4" />
          <GameFormBasic
            nextStep={nextStep}
            handleInput={handleFormChange}
            formData={formData}
            tags={gameTags}
            setGameTags={setGameTags}
          />
        </Container>
      );
    case 2:
      return (
        <Container className="mt-5">
          <ProgressBar now={66} label="Step 2" variant="info" className="mb-4" />
          <GameFormStatus
            nextStep={nextStep}
            prevStep={prevStep}
            handleInput={handleFormChange}
            formData={formData}
          />
        </Container>
      );
    case 3:
      return (
        <Container className="mt-5">
          <ProgressBar now={100} label="Done" variant="success" className="mb-4" />
          {formData.status === "PLAYING" && (
            <GameFormPlaying
              prevStep={prevStep}
              handleInput={handleFormChange}
              formData={formData}
              handleSubmitForm={handleSubmitForm}
            />
          )}
          {(formData.status === "COMPLETED" || formData.status === "DROPPED") && (
            <GameFormReview
              prevStep={prevStep}
              handleInput={handleFormChange}
              handleStarInput={handleRatingChange}
              formData={formData}
              handleSubmitForm={handleSubmitForm}
            />
          )}
          {(formData.status !== "PLAYING" && formData.status !== "COMPLETED" && formData.status !== "DROPPED") && (
            <Confirmation
              prevStep={prevStep}
              handleSubmitForm={handleSubmitForm}
            />
          )}
        </Container>
      );
    default:
      return <div>Error: Step not found</div>;
  }
}