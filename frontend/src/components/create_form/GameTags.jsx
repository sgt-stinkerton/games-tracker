import {Card, Form, InputGroup, ListGroup} from "react-bootstrap";
import {Search, XCircleFill, TagFill} from "react-bootstrap-icons";
import {useState} from "react";

import CreateFormBase from "./CreateFormBase.jsx";
import FormTop from "./FormTop.jsx";
import {searchTags} from "../../services/utilities.js";

export default function GameTags ({ prevStep, nextStep, tags, setTags }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const MAX_TAGS = 3;
  const isMaxReached = tags.length >= MAX_TAGS;

  const onSearchInput = (e) => {
    const query = e.target.value.trim();
    setSearch(query);

    if (!query) {
      setSearchResults(null);
      return;
    }
    setSearchResults(searchTags(query.trim()));
  }

  const addTag = (tag) => {
    if (!tags.includes(tag) && !isMaxReached) {
      setTags([...tags, tag]);
    }
    setSearchResults(null);
    setSearch("");
  }

  const renderSearchList = () => {
    if (!searchResults) return;

    const res = searchResults.filter(x => !tags.includes(x));

    if (!res.length)
      return (
        <div className="border rounded-2 p-2 mt-1 text-muted small bg-light text-center">
          No tags match your search.
        </div>
      );

    return (
      <ListGroup className="position-absolute w-100 shadow-sm start-0" style={{ maxHeight: "22vh", overflowY: "auto" }}>
        {res.map(tag => (
          <ListGroup.Item
            action
            key={tag}
            as="button"
            onClick={() => addTag(tag)}
            className="d-flex align-items-center bg-white border-0 border-bottom"
          >
            <TagFill className="me-2 text-muted" size={14} />
            {tag}
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }

  const submitSection = (e) => {
    e.preventDefault();
    nextStep();
  }

  return (
    <CreateFormBase canPrev={prevStep} canNext={submitSection}>
      <FormTop title="Add Tags" iconName="Tags" />
      <div className="d-flex justify-content-center align-items-center gap-1 my-2">
        <p className="text-muted m-0">
          Select up to 3 tags which best describe the game.
        </p>
      </div>

      <Card.Body className="p-3">
        <div className="mb-3" style={{ minHeight: "38px" }}>
          {tags.length === 0 && (
            <span className="text-muted small fst-italic">No tags selected.</span>
          )}

          <div className="d-flex flex-wrap gap-2">
            {tags.map(t => (
              <span
                key={t}
                className="bg-primary-subtle text-primary rounded-pill px-3 py-1 small"
                onClick={() => setTags(prev => prev.filter(x => x !== t))}
                style={{cursor: 'pointer'}}>
              {t} <XCircleFill className="ms-1 mb-1" />
            </span>
            ))}
          </div>
        </div>

        <div className="position-relative">
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0">
              <Search className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder={isMaxReached ? "Cannot add more than 3 tags." : "Search tags (e.g. action, RPG, survival)..."}
              value={search}
              onChange={onSearchInput}
              disabled={isMaxReached}
              className={`border-start-0 border-secondary ps-2 ${isMaxReached ? "bg-secondary-subtle" : "bg-white"}`}
              style={{ boxShadow: "none" }}
            />
          </InputGroup>
          {renderSearchList()}
        </div>
      </Card.Body>
    </CreateFormBase>
  );
}