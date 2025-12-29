import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Card, Col, Dropdown, ProgressBar, Row} from "react-bootstrap";
import {ArrowRepeat, PencilSquare, StarFill, Trash, TrophyFill} from "react-bootstrap-icons";
import {entryService} from "../services/entryService.js";
import {gameService} from "../services/gameService.js";
import {getStatusColor, getRatingColour} from "../services/utilities.js";
import DefaultImg from "../assets/placeholder.svg";
import "../App.css";

import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import GameEditModal from "../components/modals/GameEditModal.jsx";
import GameDeleteModal from "../components/modals/GameDeleteModal.jsx";
import GameReviewModal from "../components/modals/GameReviewModal.jsx";
import TagBadges from "../components/game_overviews/TagBadges.jsx";

// TODO error
// todo make review and text scroll prettier
// todo make expand button for play notes
// todo fix title being super duper long

export default function GamePage({ setShowToast, setToastMsg }) {
  const { gameId } = useParams();
  const [error, setError] = useState(null);
  const [entry, setEntry] = useState(null);

  const [isSyncing, setIsSyncing] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const statuses = ["TO_PLAY", "UP_NEXT", "PLAYING", "COMPLETED", "DROPPED", "HIDDEN"];

  useEffect(() => {
    entryService.getEntryByGameId(gameId)
      .then(data => setEntry(data))
      .catch(error => setError(error))
  }, [gameId]);

  const handleDelete = () => {
    gameService.deleteGame(gameId)
      .then(() => {
        setShowDeleteModal(false);
        window.location.href = "/#/games";
        setToastMsg("Game deleted successfully");
        setShowToast(true);
      })
  };

  const handleSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);

    // prevent steam rate-limiting
    const timer = new Promise(resolve => setTimeout(resolve, 3000));

    const syncRequest = gameService.syncGame(entry.game.steamAppId, entry.game.title)
      .then(() => { return entryService.getEntryByGameId(gameId); })
      .then((updatedData) => setEntry(updatedData))
      .catch(error => setError(error));

    Promise.all([timer, syncRequest]).then(() => {
      setIsSyncing(false);
      setToastMsg("Game synced successfully");
      setShowToast(true);
    });
  }

  const changeStatus = (newStatus) => {
    entryService.updateStatus(entry.id, newStatus)
      .then((updatedEntry) => {
        setEntry(updatedEntry);
        setToastMsg(`Status updated to ${newStatus.replace("_", " ")}`);
        setShowToast(true);
        if (!entry.rating && (newStatus === "COMPLETED" || newStatus === "DROPPED")) {
          setShowReviewModal(true);
        }
      })
      .catch(err => setError(err));
  };

  const getRatingColour = (value) => {
    if (!value) return "secondary"
    if (value < 5) return "danger";
    if (value < 7) return "warning";
    if (value < 10) return "success";
    return "info";
  }

  if (!entry) return <LoadingSpinner />

  const finishDateDisplay = entry.finishDate || (
    ["COMPLETED", "DROPPED"].includes(entry.status) ? "None Given" : "Unfinished"
  );

  const StatBar = ({ label, value }) => {
    const percentage = (value || 0) * 10;
    const colourClass = getRatingColour(value);

    return (
      <Row className="align-items-center">
        <Col xs={3}>
        <span className={`fw-bold small ${value ? "text-muted" : "text-secondary"}`}>
          {label}
        </span>
        </Col>

        <Col xs={7}>
          <div className="position-relative d-flex align-items-center">
            <ProgressBar now={percentage} variant={colourClass} className="w-100" style={{ height: "6px" }}/>

            {/* star on bar */}
            <div style={{position: "absolute", left: `${percentage}%`, transform: "translateX(-50%)", lineHeight: 0 }}>
              <StarFill size={18} className={`text-${colourClass}`} />
            </div>
          </div>
        </Col>

        <Col xs={2} className="text-end">
        <span className={`fw-bold small ${value ? "text-muted" : "text-secondary"}`}>
          {value || 0}/10
        </span>
        </Col>
      </Row>
    )
  }

  return (
    <>
      {/* header */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-row align-items-start gap-3 mt-1">  {/* do not touch the mt-1 */}

          {/* title, year, and status (updatable) */}
          <h4 className="mb-1">{entry.game.title} ({entry.game.releaseYear})</h4>
          <Dropdown>
            <Dropdown.Toggle className={`status-dropdown border-0 fs-6 badge fw-bold px-3 rounded-pill ${getStatusColor(entry.status)}`}>
              {entry.status.replaceAll("_", " ")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {statuses.map(s => (
                <Dropdown.Item key={s} onClick={() => changeStatus(s)} className="status-item">
                  {s.replaceAll("_", " ")}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* interactive icons to sync, edit, delete */}
        <div className="d-flex flex-row gap-3 align-items-baseline">
          <ArrowRepeat
            className={isSyncing ? "spin-active text-secondary" : "view-hover"}
            style={{cursor: isSyncing ? "" : "pointer"}}
            onClick={isSyncing ? null : handleSync}
            size={26}
          />
          {entry.status !== "HIDDEN" && (
            <PencilSquare
              className="view-hover"
              onClick={() => setShowEditModal(true)}
              size={24} />
          )}
          <Trash
            className="view-hover"
            onClick={() => setShowDeleteModal(true)}
            size={24} />
        </div>
      </div>
      <hr className="my-2"></hr>

      {/* main page content */}
      <Row className="g-4 pt-2" style={{ height: "calc(100vh - 100px)" }}>

        {/* left column */}
        <Col lg={4} className="d-flex flex-column gap-3 h-100">

          {/* game info */}
          <Card className="border-top-0 shadow-sm flex-shrink-0">
            <Card.Img
              variant="top"
              src={entry.game.headerImageUrl || DefaultImg}
              style={{ height: 150, width: "100%", objectFit: "cover" }}
            />
            <Card.Body className="p-0">
              {/* description */}
              <p className="text-muted px-3 pt-2 pb-0 m-0" style={{ fontSize: "14px" }}>
                {entry.game.description || "No description available."}
              </p>

              <div className="px-3 pb-3 pt-2">
                {/* tags */}
                <div className="d-flex flex-wrap gap-1 mb-3">
                  <TagBadges tags={entry.game.tags} />
                </div>

                <hr className="m-0"></hr>

                {/* achievements */}
                <div className="mt-2">
                  {!entry.game.steamAchievements || entry.currentAchievements === null ? (
                    <p className="m-0 text-muted small">No Steam achievement data found.</p>
                  ) : (
                    <>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <TrophyFill className="text-warning" />
                        <span className="fw-bold small">Achievements</span>
                        <span className="ms-auto small text-muted">
                        {entry.currentAchievements} / {entry.game.steamAchievements}
                      </span>
                      </div>
                      <ProgressBar
                        now={(entry.currentAchievements / (entry.game.steamAchievements || 1)) * 100}
                        variant="warning"
                        style={{ height: "8px" }}
                      />
                    </>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* user gameplay notes */}
          <Card className="border-top-0 shadow-sm flex-grow-1" style={{ minHeight: "0" }}>
            <Card.Title className="fw-bold m-0 px-3 py-2 flex-shrink-0">Play Notes</Card.Title>

            <Card.Body className="pt-0 text-muted small overflow-auto text-break flex-grow-1">
              <p style={{ whiteSpace: "pre-wrap" }}>
                {entry.notes || "No notes added for this game."}
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* right column */}
        <Col lg={8} style={{ height: "100%" }}>
          <Card className="border-top-0 shadow-sm h-100">
            <Card.Body className="p-4 d-flex flex-column h-100">

              {/* review header */}
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="d-flex flex-column">
                  <h4 className="fw-bold m-0">Your Review</h4>
                  <small className="text-muted m-0">Document your experience.</small>
                </div>

                {/* finish date */}
                <div className="d-flex flex-column align-items-center gap-1">
                  <small className="text-muted text-uppercase fw-bold lh-1" style={{fontSize: "0.7rem"}}>Completion Date</small>
                  <div className={`badge rounded-pill d-flex align-items-center gap-2 justify-content-end ${entry.finishDate ? "bg-success-subtle" : "bg-secondary-subtle text-muted"}`}>
                    <span className="fw-bold fs-5 lh-1">{finishDateDisplay}</span>
                  </div>
                </div>
              </div>

              {/* ratings */}
              <Row className="mb-4 align-items-center">
                {/* overall score circle */}
                <Col md={3} className="d-flex flex-column align-items-center justify-content-center border-end">
                  <div
                    className={`d-flex align-items-center justify-content-center text-white fw-bold rounded-circle shadow-sm bg-${getRatingColour(entry.rating)}`}
                    style={{ width: "90px", height: "90px", fontSize: "36px" }}
                  >
                    {entry.rating || "-"}
                  </div>
                  <div className="mt-2 text-center">
                    <span className={`d-block fw-bold small text-uppercase ${entry.rating ? "text-muted" : "text-secondary"}`}>
                      Total Score
                    </span>
                  </div>
                </Col>

                {/* individual ratings */}
                <Col md={9} className="ps-md-4">
                  <Row>
                    <StatBar label="Enjoyment" value={entry.enjoyment} />
                    <StatBar label="Gameplay" value={entry.gameplay} />
                    <StatBar label="Story" value={entry.story} />
                    <StatBar label="Visuals" value={entry.visuals} />
                    <StatBar label="Sound" value={entry.sound} />
                  </Row>
                </Col>
              </Row>

              {/* review text */}
              <div className="flex-grow-1 bg-light p-3 rounded-3 border-start border-4 border-secondary position-relative d-flex flex-column overflow-hidden">
                {/* quote icon */}
                <span
                  className="position-absolute text-secondary opacity-75"
                  style={{ top: '5px', left: '10px', fontSize: '3rem', lineHeight: 1 }}
                >
                  &ldquo;
                </span>

                <div className="px-3 h-100 overflow-auto" style={{ zIndex: 1, whiteSpace: "pre-wrap" }}>
                  <p className={`m-0 fst-italic fs-6 ${entry.reviewText ? "text-dark" : "text-muted opacity-50 text-center py-4"}`}>
                    {entry.reviewText || "No review written yet..."}
                  </p>
                </div>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* modals for editing / deletion confirmation */}
      <GameReviewModal
        show={showReviewModal} setShow={setShowReviewModal}
        entry={entry} setEntry={setEntry}
        setToastMsg={setToastMsg} setShowToast={setShowToast}
      />
      <GameEditModal
        show={showEditModal} setShow={setShowEditModal}
        entry={entry} setEntry={setEntry}
        setToastMsg={setToastMsg} setShowToast={setShowToast}
      />
      <GameDeleteModal
        show={showDeleteModal} setShow={setShowDeleteModal}
        title={entry.game.title}
        handleDelete={handleDelete} />

      <style type="text/css">
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spin-active {
            animation: spin 1s linear infinite;
            opacity: 0.5;
          }
        `}
      </style>
    </>
  )
}