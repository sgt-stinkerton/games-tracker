import {useState} from "react";
import {gameService} from "../../services/gameService.js"
import {entryService} from "../../services/entryService.js";

import GameInfo from "./GameInfo.jsx";
import GameStatus from "./GameStatus.jsx";
import GamePlayNotes from "./GamePlayNotes.jsx";
import GameRatings from "./GameRatings.jsx";
import GameReview from "./GameReview.jsx";
import CreateFormConfirm from "./CreateFormConfirm.jsx";
import CreateFormError from "./CreateFormError.jsx";
import GameTags from "./GameTags.jsx";
import CreateFormComplete from "./CreateFormComplete.jsx";

export default function MainCreateForm ({ }) {
  const [error, setError] = useState("");
  const [stage, setStage] = useState("info");
  const [gameTags, setGameTags] = useState([]);  // tags stay between steps
  const [recentId, setRecentId] = useState(null);

  const initEmptyForm = () => {
    return {
      title: "", releaseYear: "", tags: "",
      status: "", notes: "",
      reviewText: "", finishDate: "", rating: "",
      enjoyment: "", gameplay: "", story: "", visuals: "", sound: ""
    }
  }

  const [formData, setFormData] = useState(initEmptyForm());

  // general inputs
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // specifically for ratings
  const handleRatingChange = (type, value) => {
    setFormData(prev => ({ ...prev, [type]: value }))
  }

  // get next part of form
  const nextStep = () => {
    if (stage === "info") {
      setStage("tags");
    } else if (stage === "tags") {
      setStage("status")
    } else if (stage === "status") {
      if (formData.status === "PLAYING") {
        setStage("play-notes");
      } else if (formData.status === "COMPLETED" || formData.status === "DROPPED") {
        setStage("ratings");
      } else {
        setStage("confirm");
      }
    } else if (stage === "ratings") {
      setStage("review");
    } else if (stage === "play-notes" || stage === "review") {
      setStage("confirm");
    } else if (stage === "complete") {
      setStage("info")
    } else if (stage === "error") {
      setStage("info");
    } else {
      setStage("error");
    }
  }

  // get previous part of form
  const prevStep = () => {
    if (stage === "tags") {
      setStage("info")
    } else if (stage === "status") {
      setStage("tags");
    } else if (stage === "play-notes" || stage === "ratings") {
      setStage("status");
    } else if (stage === "confirm") {
      if (formData.status === "PLAYING") {
        setStage("play-notes");
      } else if (formData.status === "COMPLETED" || formData.status === "DROPPED") {
        setStage("review");
      } else {
        setStage("status");
      }
    } else if (stage === "review") {
      setStage("ratings");
    } else {
      setStage("error");
    }
  }

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
        setRecentId(Number(newGame.id));
        entryData.gameId = Number(newGame.id);
        return entryService.createEntry(entryData);
      })
      .then((newEntry) => {
        if (["COMPLETED", "DROPPED"].includes(formData.status)) {
          return entryService.createReview(newEntry.id, reviewData);
        }
      })
      .then(() => {
        setFormData(initEmptyForm());
        setStage("complete");
      })
      .catch(error => {
        setStage("error");
        setError(error);
      })
  };

  switch (stage) {
    case "info":
      return (
        <GameInfo
          nextStep={nextStep}
          handleInput={handleInput}
          formData={formData}
        />
      )
    case "tags":
      return (
        <GameTags
          prevStep={prevStep}
          nextStep={nextStep}
          handleInput={handleInput}
          formData={formData}
          tags={gameTags}
          setTags={setGameTags}
        />
      )
    case "status":
      return (
        <GameStatus
          prevStep={prevStep}
          nextStep={nextStep}
          handleInput={handleInput}
          formData={formData}
        />
      )
    case "play-notes":
      return (
        <GamePlayNotes
          prevStep={prevStep}
          nextStep={nextStep}
          handleInput={handleInput}
          formData={formData}
        />
      )
    case "ratings":
      return (
        <GameRatings
          prevStep={prevStep}
          nextStep={nextStep}
          handleInput={handleRatingChange}
          formData={formData}
        />
      )
    case "review":
      return (
        <GameReview
          prevStep={prevStep}
          nextStep={nextStep}
          handleInput={handleInput}
          formData={formData}
        />
      )
    case "confirm":
      return (
        <CreateFormConfirm
          prevStep={prevStep}
          formData={formData}
          confirm={aggregateFormData}
          tags={gameTags}
        />
      )
    case "complete":
      return (
        <CreateFormComplete
          nextStep={nextStep}
          recentId={recentId}
        />
      )
    case "error":
      return (
        <CreateFormError
          nextStep={nextStep}
          handleInput={handleInput}
          error={error}
        />
      )
    default:
      return (
        <CreateFormError
          nextStep={nextStep}
          handleInput={handleInput}
          error={error}
        />
      )
  }
}