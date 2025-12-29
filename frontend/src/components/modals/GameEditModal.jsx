import {useEffect, useState} from "react";
import {Button, Col, Form, Modal, Tabs, Tab, Row} from "react-bootstrap";
import {ArrowCounterclockwise} from "react-bootstrap-icons";
import {gameService} from "../../services/gameService.js";
import {entryService} from "../../services/entryService.js";
import {getRatingColour} from "../../services/utilities.js";

import SetTodayDate from "../SetTodayDate.jsx";
import ClearDate from "../ClearDate.jsx";
import TagSearch from "../TagSearch.jsx";
import StarRating from "../StarRating.jsx";

export default function GameEditModal({ entry, setEntry, show, setShow, setToastMsg, setShowToast }) {
  const [error, setError] = useState(null);
  const [existingTitles, setExistingTitles] = useState([]);

  // get existing titles so there are no exact duplicates
  useEffect(() => {
    if (show) {
      gameService.getAllGames()
        .then(data => {
          const titles = data.map(g => g.title);
          setExistingTitles(titles);
        })
        .catch(error => setError(error))
    }
  }, [show]);
  
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

  // levels of edit ability
  const canEditNotes = entry && ["PLAYING"].includes(entry.status);
  const canEditReview = entry && ["COMPLETED", "DROPPED"].includes(entry.status);

  // rating checkers
  const ratingTypes = ["enjoyment", "gameplay", "story", "visuals", "sound"];
  const someNullRatings = ratingTypes.some(type => !formData[type] || formData[type] === "");
  const allNullRatings = ratingTypes.every(type => !formData[type] || formData[type] === "");

  // calculate overall score if all ratings given
  const calculateFinal = () => {
    if (!someNullRatings) {
      const total = ratingTypes.reduce((sum, type) => {
        return sum + Number(formData[type]);
      }, 0);
      return total / ratingTypes.length;
    }
    return "N/A";
  }

  // checks length of string fields
  const isWithinCharLimit = (type) => {
    if (type === "title") return formData.title?.length <= 255;
    if (type === "description") return formData.description?.length <= 350;
    if (type === "notes") return formData.notes?.length <= 1024;
    if (type === "reviewText") return formData.reviewText?.length <= 8192;
    return true;
  }

  // validation logic
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // title validation
    formData.title = formData.title.trim();
    if (formData.title === "") {
      return setError("Game must have a title.");
    }
    // cannot have the same title as an existing game
    const titleExists = existingTitles?.some(t => (
      t.toLowerCase() === formData.title.toLowerCase()));
    if (titleExists && formData.title.toLowerCase() !== entry.game.title.toLowerCase()) {
      return setError(`Game with title '${formData.title}' already exists.`);
    }

    // year validation
    if (formData.releaseYear && !Number.isInteger(parseInt(formData.releaseYear))) {
      return setError("Release year must be a number.");
    }
    if (formData.releaseYear && parseInt(formData.releaseYear) < 1970) {
      return setError("Release year must be after 1970.");
    }

    // description validation
    formData.description = formData.description?.trim();
    if (!isWithinCharLimit("description")) {
      return setError("Description must be less than 350 characters.");
    }

    // notes validation
    formData.notes = formData.notes?.trim();
    if (!isWithinCharLimit("notes")) {
      return setError("Notes must be less than 1024 characters.");
    }

    // review text validation
    formData.reviewText = formData.reviewText?.trim();
    if (!isWithinCharLimit("reviewText")) {
      return setError("Review text must be less than 8192 characters.");
    }

    // rating validation
    if (someNullRatings && !allNullRatings) {
      return setError("Must give no or all ratings.")
    }

    aggregateFormData();
  }

  // helper for ratings
  const formatScore = (val) => {
    if (val === "" || val === null || val === undefined) return null;
    return Number(val);
  };

  // put form data together
  const aggregateFormData = () => {
    const gameData = {
      title: formData.title,
      releaseYear: formData.releaseYear !== "" ? parseInt(formData.releaseYear) : null,
      tags: formData.tags,
      description: formData.description !== "" ? formData.description : null,
      headerImageUrl: formData.headerImageUrl !== "" ? formData.headerImageUrl : null
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
        if (canEditReview || canEditNotes) return entryService.updateNotes(entry.id, entryData);
      })
      .then(() => {
        if (canEditReview) return entryService.createReview(entry.id, reviewData);
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

  // checks if a form section has been edited
  const changesMade = (field, type) => {
    const formField = formData[field];
    if (type !== "game") {
      if (field === "reviewText") return formField !== entry[field];

      if (field === "finishDate") {
        const current = formField || "";
        const original = entry[field] || "";
        return current !== original;
      }

      // ratings
      if (formField === "" && !entry[field]) return false;
      return formField !== entry[field];
    }

    const prevData = entry.game[field];
    if (field !== "tags") return formField !== prevData;

    if (formField.length !== prevData.length) return true;
    return !(prevData.every((t, i) => t === formField[i]));
  }

  // resets a form section to the original data
  const resetField = (field, type) => {
    if (type === "game") {
      return setFormData({ ...formData, [field]: entry.game[field] });
    }
    return setFormData({ ...formData, [field]: entry[field] });
  };

  // clears the date field completely
  const resetDate = () => {
    onFormChange({ target: {name: "finishDate", value: "" }});
  }

  // handles changes to input fields
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // forces year input to be numerical only
  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      onFormChange(e);
    }
  };

  // special input handler for ratings
  const handleRatingChange = (type, value) => {
    setFormData(prev => ({ ...prev, [type]: value }))
  };

  // if changes were made, display an arrow to revert those changes
  const revertArrow = (field, type) => {
    return changesMade(field, type) ? (
      <span title="Revert Change">
        <ArrowCounterclockwise
          size={18}
          onClick={() => resetField(field, type)}
          style={{ cursor: "pointer" }}
        />
      </span>
      ) : (
      <span style={{ width: "18px" }}></span>
    )
  };

  // header for input fields, including form label, span text, and conditional revert arrow
  const InputHeader = (title, field, type, span) => (
    <div className="d-flex justify-content-between align-items-end mb-1">
      <div>
        <Form.Label className="fw-bold m-0">{title}</Form.Label>
        {span && (
          <span className="text-muted small ms-2">
            ({span === "Max 3" ? span : `${formData[field]?.length || 0}/${span} characters`})
          </span>
        )}
      </div>
      {revertArrow(field, type)}
    </div>
  );

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg" backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">Edit Game Details</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pt-2">
        <Form>
          <Tabs defaultActiveKey="details" className="mb-3">
            <Tab eventKey="details" title="Game Info">
              <Row>
                <Col lg={7} className="d-flex flex-column gap-3">
                  {/* title */}
                  <div>
                    {InputHeader("Game Title", "title", "game", "255")}
                    <Form.Control
                      type="text"
                      name="title"
                      className="bg-white"
                      value={formData.title || ""}
                      onChange={onFormChange}
                      maxLength={255}
                    />
                  </div>

                  {/* tags */}
                  <div>
                    {InputHeader("Tags", "tags", "game", "Max 3")}
                    <TagSearch formData={formData} setFormData={setFormData} />
                  </div>
                </Col>

                <Col lg={5} className="d-flex flex-column gap-3">
                  {/* release year */}
                  <div>
                    {InputHeader("Release Year", "releaseYear", "game")}
                    <Form.Control
                      type="text"
                      name="releaseYear"
                      className="bg-white"
                      value={formData.releaseYear || ""}
                      onChange={handleYearChange}
                      placeholder="Enter release year..."
                      maxLength={4}
                    />
                  </div>

                  {/* description */}
                  <div>
                    {InputHeader("Description", "description", "game", "350")}
                    <Form.Control
                      as="textarea"
                      rows={9}
                      name="description"
                      className="bg-white"
                      value={formData.description || ""}
                      onChange={onFormChange}
                      placeholder="Enter a short description..."
                      maxLength={350}
                      style={{ resize: "none" }}
                    />
                  </div>
                </Col>
              </Row>
            </Tab>

            {canEditNotes && (
              <Tab eventKey="notes" title="Gameplay Notes">
                {InputHeader("Gameplay Notes", "notes", "entry", "1024")}
                <Form.Control
                  as="textarea"
                  rows={12}
                  name="notes"
                  className="bg-white"
                  placeholder="Jot down any thoughts had whilst playing..."
                  value={formData.notes || ""}
                  onChange={onFormChange}
                  style={{ resize: "none" }}
                  maxLength={1024}
                />
              </Tab>
            )}

            {canEditReview && (
              <Tab eventKey="review" title="Review">
                <Row className="g-4">
                  <Col lg={6} className="d-flex flex-column gap-3">
                    {/* finish date */}
                    <div className="rounded-3">
                      {InputHeader("Finish Date", "finishDate", "entry")}
                      <div className="d-flex justify-content-between">
                        <div className="d-flex gap-2">
                          <Form.Control
                            type="date"
                            name="finishDate"
                            className="bg-white border-secondary-subtle"
                            value={formData.finishDate || ""}
                            onChange={onFormChange}
                            style={{ width: "160px" }}
                          />
                          <SetTodayDate handleInput={onFormChange} />
                        </div>
                        <ClearDate handleInput={resetDate} />
                      </div>
                    </div>

                    {/* review text */}
                    <div className="d-flex flex-column h-100">
                      {InputHeader("Review Text", "reviewText", "entry", "8192")}
                      <Form.Control
                        as="textarea"
                        name="reviewText"
                        className="bg-white flex-grow-1"
                        placeholder="What did you think about this game? Write your thoughts here..."
                        style={{ resize: "none" }}
                        value={formData.reviewText || ""}
                        onChange={onFormChange}
                        maxLength={8192}
                      />
                    </div>
                  </Col>

                  {/* ratings */}
                  <Col lg={6} className="d-flex flex-column gap-1">

                    {/* header */}
                    <div className="p-1">
                      <h6 className="mb-1 fw-bold">Rate Each Category</h6>
                      <p className="m-0 small">To make your review shine, rate the game in each of the 5 categories. If you rate the game in one category, you must rate it in all categories.</p>
                    </div>

                    {/* actual ratings (using stars) */}
                    <div className="d-flex flex-column gap-2 ps-1 pt-1">
                      {ratingTypes.map(t => (
                        <div key={t} className="d-flex flex-row align-items-center justify-content-between">
                          <Col lg={3}>
                            <Form.Label className="fw-bold mb-0 text-capitalize" style={{ fontSize: "14px" }}>{t}</Form.Label>
                          </Col>

                          <Col lg={9}>
                            <div className="d-flex flex-row align-items-center">
                              <StarRating
                                type={t}
                                defaultRating={formData[t]}
                                getCurrentRating={handleRatingChange}
                                displaySize={22}
                              />
                              {revertArrow(t, "entry")}
                            </div>
                          </Col>
                        </div>
                      ))}
                    </div>

                    {/* overall calculator */}
                    <div className="w-100 d-flex flex-row justify-content-center align-items-center mt-3">
                      <div className={`bg-${getRatingColour(calculateFinal())}-subtle w-50 h-50 rounded-2 d-flex flex-row justify-content-center align-items-center`}>
                        <strong>TOTAL</strong>
                        <strong
                          className={`text-white bg-${getRatingColour(calculateFinal())} text-center mx-2 fs-4 rounded-circle d-flex align-items-center justify-content-center`}
                          style={{ width: "55px", height: "55px" }}
                        >
                          {calculateFinal()}
                        </strong>
                        <strong>SCORE</strong>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Tab>
            )}
          </Tabs>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-row justify-content-between">
        <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>

        {error && (
          <p className="m-0 text-danger bg-danger-subtle px-2 py-1 rounded-2">{error}</p>
        )}

        <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  )
}