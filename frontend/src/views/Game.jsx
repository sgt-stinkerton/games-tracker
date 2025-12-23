import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Row, Col, Dropdown} from "react-bootstrap";
import {PencilSquare, Trash} from "react-bootstrap-icons";
import {entryService} from "../services/entryService.js";
import {getStatusColor} from "../services/utilities.js";

import LoadingSpinner from "../components/LoadingSpinner.jsx";
import DefaultImg from "../assets/placeholder.svg";

export default function Game ({ setShowToast, setToastMsg }) {
  const [entry, setEntry] = useState(null);
  const [error, setError] = useState(null);
  const {gameId} = useParams();

  useEffect(() => {
    entryService.getEntryByGameId(gameId)
      .then(data => setEntry(data))
      .catch(error => setError(error))
  }, [gameId]);

  const changeStatus = (newStatus) => {
    entryService.updateStatus(entry.id, newStatus)
      .then((updatedEntry) => {
        setEntry(updatedEntry);
        setToastMsg(`Status updated to ${newStatus.replace("_", " ")}`);
        setShowToast(true);
      })
      .catch(err => setError(err));
  };

  if (entry === null) return <LoadingSpinner />

  return (
    <>
      <div className="d-flex justify-content-between align-items-baseline">
        <div className="d-flex flex-row align-items-baseline gap-3 mt-1">  {/* do not touch the mt-1 */}
          <h4 className="mb-1">{entry.game.title} ({entry.game.releaseYear})</h4>
          <p className={`m-0 align-self-center fw-bold px-2 rounded-4 ${getStatusColor(entry.status)}`}>
            {entry.status.replaceAll("_", " ")}
          </p>
        </div>

        {/* TODO edit and bin */}
        <div className="d-flex flex-row gap-3 align-items-center">
          <Dropdown>
            <Dropdown.Toggle className="px-2 py-0 m-0">
              Update Status
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeStatus("TO_PLAY")}>
                TO PLAY
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeStatus("UP_NEXT")}>
                UP NEXT
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeStatus("PLAYING")}>
                PLAYING
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeStatus("COMPLETED")}>
                COMPLETED
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeStatus("DROPPED")}>
                DROPPED
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeStatus("HIDDEN")}>
                HIDDEN
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <PencilSquare size={24} />
          <Trash size={24} />
        </div>
      </div>
      <hr className="my-2"></hr>

      <Row className="g-4 pt-2" style={{ height: "calc(100vh - 100px)" }}>

        {/* left column */}
        <Col md={6} className="d-flex flex-column gap-4 h-100">

          {/* game image and basic info */}
          <div className="bg-white border border-secondary-subtle p-3 rounded">
            <img
              src={entry.game.headerImageUrl || DefaultImg}
              alt={"header image for " + entry.game.title}
              className="rounded-2"
              style={{width: "100%", objectFit: "cover"}}
            />

            <div className="mt-2">
              <p className="m-0">{entry.game.description}</p>
              <p className="m-0">{entry.game.tags}</p>
            </div>
          </div>

          {/* achievement progress and notes */}
          <div className="bg-white border border-secondary-subtle p-3 rounded h-100 overflow-auto">
            <p className="m-0">achievements: {entry.currentAchievements}/{entry.game.steamAchievements}</p>
            <p className="m-0">notes: {entry.notes}</p>
          </div>
        </Col>

        {/* right column - review */}
        <Col md={6} className="h-100">
          <div className="bg-white border border-secondary-subtle p-3 rounded h-100 overflow-auto">
            <h5 className="fw-bold">Your Review</h5>
            <p className="m-0">review text: {entry.reviewText}</p>
            <p className="m-0">finish date: {entry.finishDate}</p>
            <p className="m-0">rating: {entry.rating}</p>
            <p className="m-0">enjoyment: {entry.enjoyment}</p>
            <p className="m-0">gameplay: {entry.gameplay}</p>
            <p className="m-0">story: {entry.story}</p>
            <p className="m-0">visuals: {entry.visuals}</p>
            <p className="m-0">sound: {entry.sound}</p>
          </div>
        </Col>

      </Row>
    </>
  )
}