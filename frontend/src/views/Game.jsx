import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Row, Col, Dropdown, Button, Modal, ProgressBar, Card, Badge} from "react-bootstrap";
import {Check, Controller, PencilSquare, Trash, TrophyFill, StarFill} from "react-bootstrap-icons";
import {gameService} from "../services/gameService.js";
import {entryService} from "../services/entryService.js";
import {getStatusColor} from "../services/utilities.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import DefaultImg from "../assets/placeholder.svg";

// TODO if error occurs when adding game, just... delete everything that you tried to make? lol?

export default function Game ({ setShowToast, setToastMsg }) {
  const [mode, setMode] = useState("view");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entry, setEntry] = useState(null);
  const [error, setError] = useState(null);
  const {gameId} = useParams();

  useEffect(() => {
    entryService.getEntryByGameId(gameId)
      .then(data => {
        setEntry(data);
        console.log(data);
      })
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
  }

  const changeStatus = (newStatus) => {
    entryService.updateStatus(entry.id, newStatus)
      .then((updatedEntry) => {
        setEntry(updatedEntry);
        setToastMsg(`Status updated to ${newStatus.replace("_", " ")}`);
        setShowToast(true);
      })
      .catch(err => setError(err));
  };

  const StatBar = ({ label, value }) => (
    <div className="mb-2">
      <div className="d-flex justify-content-between small mb-1">
        <span className="fw-bold text-secondary text-uppercase">{label}</span>
        <span className="fw-bold">{value || 0}/10</span>
      </div>
      <ProgressBar
        now={(value || 0) * 10}
        variant="info"
        style={{ height: "6px" }}
      />
    </div>
  )

  if (entry === null) return <LoadingSpinner />

  return (
    <>
      {/* header */}
      <div className="d-flex justify-content-between align-items-baseline">
        <div className="d-flex flex-row align-items-baseline gap-3 mt-1">  {/* do not touch the mt-1 */}
          <h4 className="mb-1">{entry.game.title} ({entry.game.releaseYear})</h4>
          <p className={`m-0 align-self-center fs-6 badge fw-bold px-3 rounded-4 ${getStatusColor(entry.status)}`}>
            {entry.status.replaceAll("_", " ")}
          </p>
        </div>

        {/* TODO edit */}
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

          {mode === "view" && (
            <PencilSquare
              className="view-hover"
              onClick={() => setMode("edit")}
              size={24} />
          )}
          {mode === "edit" && (
            <Check
              className="view-hover"
              onClick={() => setMode("view")}
              size={24} />
          )}
          <Trash className="view-hover" onClick={() => setShowDeleteModal(true)} size={24} />
        </div>
      </div>
      <hr className="my-2"></hr>

      {/* main content */}
      <Row className="g-4 pt-2" style={{ height: "calc(100vh - 100px)" }}>
        {/* left column */}
        <Col lg={4} className="d-flex flex-column gap-3">

          {/* game image and basic info */}
          <Card className="border-0 shadow-sm">
            <Card.Img
              variant="top"
              src={entry.game.headerImageUrl || DefaultImg}
              style={{ width: "100%", objectFit: "cover" }}
            />
            <Card.Body>
              {/* description */}
              <p className="text-muted mb-2" style={{ fontSize: "14px" }}>
                {entry.game.description || "No description available."}
              </p>

              {/* tags */}
              <div className="d-flex flex-wrap gap-1 mb-3">
                {entry.game.tags.length > 0 ? (
                  entry.game.tags.map(tag => (
                    <Badge key={tag} bg="light" text="dark" className="border">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted small fst-italic">No tags</span>
                )}
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
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm h-100">
            <div className="d-flex flex-row align-items-center px-3 py-2">
              <Controller className="me-2" size={24} />
              <Card.Title className="fw-bold m-0">Play Notes</Card.Title>
            </div>

            <Card.Body className="pt-0 text-muted small overflow-auto">
              {entry.notes || "No notes added for this game."}
            </Card.Body>
          </Card>
        </Col>

        {/* right column - review */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <h4 className="fw-bold mb-0">Review</h4>
                {/* Finish Date Badge */}
                {entry.finishDate && (
                  <Badge bg="success" className="d-flex align-items-center gap-2 py-2 px-3">
                    <CalendarEvent /> Finished: {entry.finishDate}
                  </Badge>
                )}
              </div>

              {/* Review Text */}
              <div className="bg-light p-3 rounded-3 fst-italic text-secondary mb-4 border-start border-4 border-primary">
                "{entry.reviewText || "No review written yet."}"
              </div>

              {/* Ratings Grid */}
              <h6 className="fw-bold text-muted text-uppercase mb-3">Scorecard</h6>
              <Row className="align-items-center">

                {/* Big Overall Score */}
                <Col md={3} className="text-center mb-3 mb-md-0 border-end">
                  <div className="display-4 fw-bold text-primary">{entry.rating || 0}</div>
                  <div className="d-flex justify-content-center text-warning mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarFill key={i} size={12} className={i < Math.round((entry.rating || 0)/2) ? "opacity-100" : "opacity-25"} />
                    ))}
                  </div>
                  <small className="text-muted text-uppercase fw-bold ls-1">Overall Rating</small>
                </Col>

                {/* Sub Scores */}
                <Col md={9}>
                  <Row className="g-3">
                    <Col sm={6}>
                      <StatBar label="Enjoyment" value={entry.enjoyment} />
                      <StatBar label="Gameplay" value={entry.gameplay} />
                    </Col>
                    <Col sm={6}>
                      <StatBar label="Story" value={entry.story} />
                      <StatBar label="Visuals" value={entry.visuals} />
                      <StatBar label="Sound" value={entry.sound} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Delete Game?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete <strong>{entry.game.title}</strong>?</p>
          <p className="text-muted small">
            This action is permanent. If you own this on Steam, consider setting it to <strong>Hidden</strong> instead to prevent it from reappearing during syncs.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete Permanently</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}