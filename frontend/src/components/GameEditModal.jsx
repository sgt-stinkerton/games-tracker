import {useEffect, useState} from "react";
import {gameService} from "../services/gameService.js";
import {entryService} from "../services/entryService.js";
import {searchTags} from "../services/utilities.js";
import {Badge, Button, Col, Form, InputGroup, ListGroup, Modal, Row} from "react-bootstrap";
import {Search, TagFill, XCircleFill} from "react-bootstrap-icons";
import SetTodayDate from "./SetTodayDate.jsx";

export default function GameEditModal({ entry, setEntry, show, setShow, setToastMsg, setShowToast }) {
  const [error, setError] = useState(null);
  const [existingTitles, setExistingTitles] = useState([]);

  const isWithinCharLimit = (type) => {
    if (type === "description") return formData.description?.length <= 350;
    if (type === "notes") return formData.notes?.length <= 1024;
    if (type === "reviewText") return formData.reviewText?.length <= 8192;
    return true;
  }

  // get existing titles so there are no exact duplicates
  useEffect(() => {
    gameService.getAllGames()
      .then(data => {
        const titles = data.map(g => g.title);
        setExistingTitles(titles);
      })
      .catch(error => setError(error))
  }, []);
  
  // tag searching
  const [tagSearch, setTagSearch] = useState("");
  const [tagResults, setTagResults] = useState(null);

  // levels of edit ability
  const canEditNotes = entry && ["PLAYING", "COMPLETED", "DROPPED"].includes(entry.status);
  const canEditReview = entry && ["COMPLETED", "DROPPED"].includes(entry.status);
  
  // form data
  const setInitForm = () => {
    return {
      // game data
      title: entry.game.title,
      releaseYear: entry.game.releaseYear,
      description: entry.game.description || "",
      tags: [...entry.game.tags],

      // entry data
      notes: entry.notes || "",

      // review data
      reviewText: entry.reviewText || "",
      finishDate: entry.finishDate || "",
      enjoyment: entry.enjoyment ?? "",
      gameplay: entry.gameplay ?? "",
      story: entry.story ?? "",
      visuals: entry.visuals ?? "",
      sound: entry.sound ?? ""
    };
  };
  
  const [formData, setFormData] = useState(setInitForm());
  
  // helper for ratings
  const formatScore = (val) => {
    if (val === "" || val === null || val === undefined) return null;
    return Number(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    formData.title = formData.title.trim();

    if (formData.releaseYear && !Number.isInteger(parseInt(formData.releaseYear))) {
      setError("Release year must be a number.");
      return;
    }

    if (formData.releaseYear && parseInt(formData.releaseYear) < 1970) {
      setError("Release year must be after 1970.");
      return;
    }

    if (formData.title === "") {
      setError("Game must have a title.");
      return;
    }

    // cannot have the same title as an existing game
    const titleExists = existingTitles?.some(t => (
      t.toLowerCase() === formData.title.toLowerCase()));
    if (titleExists && formData.title.toLowerCase() !== entry.game.title.toLowerCase()) {
      setError(`Game with title '${formData.title}' already exists.`);
      return;
    }


    formData.description = formData.description?.trim();
    if (!isWithinCharLimit("description")) {
      setError("Description must be less than 350 characters.");
      return;
    }

    formData.notes = formData.notes?.trim();
    if (!isWithinCharLimit("notes")) {
      setError("Notes must be less than 1024 characters.");
      return;
    }

    formData.reviewText = formData.reviewText?.trim();
    if (!isWithinCharLimit("reviewText")) {
      setError("Review text must be less than 8192 characters.");
      return;
    }

    aggregateFormData();
  }

  const aggregateFormData = () => {
    const gameData = {
      title: formData.title,
      releaseYear: formData.releaseYear !== "" ? parseInt(formData.releaseYear) : null,
      tags: formData.tags,
      description: formData.description !== "" ? formData.description : null,
    };

    const entryData = {
      status: entry.status,
      notes: canEditNotes ? formData.notes : null,
      userId: 1,
      gameId: entry.game.id
    };

    const reviewData = {
      reviewText: formData.reviewText,
      finishDate: formData.finishDate,
      enjoyment: formatScore(formData.enjoyment),
      gameplay: formatScore(formData.gameplay),
      story: formatScore(formData.story),
      visuals: formatScore(formData.visuals),
      sound: formatScore(formData.sound)
    };

    executeUpdate(gameData, entryData, reviewData)
  };

  // call api services to create instances of entities
  const executeUpdate = (gameData, entryData, reviewData) => {
    gameService.updateGame(entry.game.id, gameData)
      .then(() => {
        if (canEditReview || canEditNotes) {
          return entryService.updateNotes(entry.id, entryData);
        }
      })
      .then(() => {
        if (canEditReview) {
          return entryService.createReview(entry.id, reviewData);
        }
      })
      .then(() => {
        return entryService.getEntryByGameId(entry.game.id);
      })
      .then((freshEntry) => {
        setEntry(freshEntry);
        setShow(false);
        setToastMsg("Game details updated successfully!");
        setShowToast(true);
      })
      .catch(error => {
        setError(error);
      })
  };

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Tag Logic (from your provided code)
  const onTagSearchInput = (e) => {
    const query = e.target.value;
    setTagSearch(query);
    if (!query.trim()) {
      setTagResults(null);
      return;
    }
    setTagResults(searchTags(query.trim()));
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  const addTag = (tag) => {
    if (!formData.tags.includes(tag) && formData.tags.length < 3) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagResults(null);
    setTagSearch("");
  };

  const EditScoreInput = ({ label, name }) => (
    <Form.Group as={Col} xs={6} md={4} className="mb-3">
      <Form.Label className="small fw-bold text-muted">{label}</Form.Label>
      <Form.Control
        type="number"
        min="0" max="10"
        className="bg-white"
        name={name}
        value={formData[name]}
        onChange={onFormChange}
      />
    </Form.Group>
  );

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Edit Game Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <Form>
          {/* 1. GENERAL INFO (Always Editable) */}
          <h6 className="fw-bold text-primary mb-3">General Info</h6>
          <Row className="mb-3">
            <Col md={8}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                className="bg-white"
                value={formData.title || ""}
                onChange={onFormChange} />
            </Col>
            <Col md={4}>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="releaseYear"
                className="bg-white"
                value={formData.releaseYear || ""}
                onChange={onFormChange} />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              className="bg-white"
              value={formData.description || ""}
              onChange={onFormChange} />

            <div className="text-muted small">
              {formData.description.length}/350 characters.
            </div>
          </Form.Group>

          {/* TAGS (Always Editable) */}
          <Form.Group className="mb-4">
            <Form.Label>Tags (Max 3)</Form.Label>
            <div className="d-flex flex-wrap gap-2 mb-2">
              {formData.tags?.map(t => (
                <Badge key={t} bg="primary-subtle" text="primary" className="d-flex align-items-center px-2 py-2" style={{cursor: 'pointer'}} onClick={() => removeTag(t)}>
                  {t} <XCircleFill className="ms-2" />
                </Badge>
              ))}
            </div>
            <div className="position-relative">
              <InputGroup>
                <InputGroup.Text className="bg-white"><Search /></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder={formData.tags?.length >= 3 ? "Max tags reached" : "Search tags..."}
                  value={tagSearch}
                  onChange={onTagSearchInput}
                  disabled={formData.tags?.length >= 3}
                  className={`border-start-0 border-secondary ps-2 ${formData.tags?.length >= 3 ? "bg-secondary-subtle" : "bg-white"}`}
                  style={{ boxShadow: "none" }}
                />
              </InputGroup>
              {tagResults && tagResults.length > 0 && (
                <ListGroup className="position-absolute w-100 shadow-sm start-0 bg-white" style={{ zIndex: 1050, maxHeight: "200px", overflowY: "auto" }}>
                  {tagResults.filter(t => !formData.tags?.includes(t)).map(tag => (
                    <ListGroup.Item action key={tag} onClick={() => addTag(tag)}>
                      <TagFill className="me-2 text-muted" size={12} /> {tag}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </div>
          </Form.Group>

          {/* 2. PLAY NOTES (Conditional) */}
          {canEditNotes && (
            <>
              <hr />
              <h6 className="fw-bold text-primary mb-3">Play Notes</h6>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="notes"
                  className="bg-white"
                  placeholder="Jot down thoughts while playing..."
                  value={formData.notes || ""}
                  onChange={onFormChange}
                />

                <div className="text-muted small">
                  {formData.notes.length}/1024 characters.
                </div>
              </Form.Group>
            </>
          )}

          {/* 3. REVIEW (Conditional) */}
          {canEditReview && (
            <>
              <hr />
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-primary m-0">Review & Ratings</h6>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="date"
                    name="finishDate"
                    className="bg-white"
                    value={formData.finishDate || ""}
                    onChange={onFormChange}
                    size="sm" style={{width: "140px"}}
                  />
                  <SetTodayDate handleInput={onFormChange} />
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Review Text</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="reviewText"
                  className="bg-white"
                  placeholder="Write your final thoughts..."
                  value={formData.reviewText || ""}
                  onChange={onFormChange}
                />

                <div className="text-muted small">
                  {formData.reviewText.length}/8192 characters.
                </div>
              </Form.Group>

              <Row>
                <EditScoreInput label="Enjoyment" name="enjoyment" />
                <EditScoreInput label="Gameplay" name="gameplay" />
                <EditScoreInput label="Story" name="story" />
                <EditScoreInput label="Visuals" name="visuals" />
                <EditScoreInput label="Sound" name="sound" />
              </Row>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  )
}