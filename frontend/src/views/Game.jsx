import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {gameService} from "../services/gameService.js";

import CommonPageHeader from "../components/CommonPageHeader.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

// TODO whole page

export default function Game ({ setShowToast, setToastMsg }) {
  const [entry, setEntry] = useState(null);
  const [error, setError] = useState(null);
  const {gameId} = useParams();

  useEffect(() => {
    gameService.getEntryByGameId(gameId)
      .then(data => setEntry(data))
      .catch(error => setError(error))
  }, [gameId]);

  if (entry === null) return <LoadingSpinner />

  return (
    <>
      <CommonPageHeader title={entry.game.title} />

      <p>steam app id: {entry.game.steamAppId}</p>
      <p>year: {entry.game.releaseYear}</p>
      <p>status: {entry.status}</p>
      <p>notes: {entry.notes}</p>
      <p>fullAchievements: {entry.fullAchievements}</p>
      <p>review: {entry.reviewText}</p>
      <p>finish date: {entry.finishDate}</p>
      <p>rating: {entry.rating}</p>
      <p>enjoyment: {entry.enjoyment}</p>
      <p>gameplay: {entry.gameplay}</p>
      <p>story: {entry.story}</p>
      <p>visuals: {entry.visuals}</p>
      <p>sound: {entry.sound}</p>
    </>
  )
}