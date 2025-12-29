import {useState} from "react";
import {Form, InputGroup, ListGroup} from "react-bootstrap";
import {Search, TagFill, XCircleFill} from "react-bootstrap-icons";
import {searchTags} from "../services/utilities.js";

export default function TagSearch({ formData, setFormData, marginProp }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);

  const MAX_TAGS = 3;
  const isMaxReached = formData.tags?.length >= MAX_TAGS;

  const onSearchInput = (e) => {
    const query = e.target.value;
    setSearch(query);
    if (!query.trim()) {
      setResults(null);
      return;
    }
    setResults(searchTags(query.trim()));
  };

  const addTag = (tag) => {
    if (!formData.tags.includes(tag) && !isMaxReached) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setResults(null);
    setSearch("");
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  const renderSearchList = () => {
    if (!results) return;

    const res = results.filter(t => !formData.tags?.includes(t));

    if (!res.length)
      return (
        <div className="border rounded-2 p-2 mt-1 text-muted small bg-light text-center">
          No tags match your search.
        </div>
      );

    return (
      <ListGroup
        className="position-absolute w-100 shadow-sm start-0"
        style={{ maxHeight: "22vh", overflowY: "auto" }}
      >
        {res.map(tag => (
          <ListGroup.Item
            action
            key={tag}
            as="button"
            onClick={() => addTag(tag)}
            className="d-flex align-items-center bg-white border-0 border-bottom"
          >
            <TagFill className="me-2 text-muted" size={14} /> {tag}
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }

  return (
    <>
      <div className={marginProp} style={{ minHeight: "38px" }}>
        {formData.tags.length === 0 && (
          <span className="text-muted small fst-italic">No tags selected.</span>
        )}

        <div className="d-flex flex-wrap gap-2">
          {formData.tags.map(t => (
            <span
              key={t}
              className="bg-primary-subtle text-primary rounded-pill px-3 py-1 small"
              onClick={() => removeTag(t)}
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
            placeholder={isMaxReached
              ? `Cannot add more than ${MAX_TAGS} tags.`
              : "Search tags (e.g. action, RPG, survival)..."}
            value={search}
            onChange={onSearchInput}
            disabled={isMaxReached}
            className={`border-start-0 border-secondary ps-2 ${isMaxReached 
              ? "bg-secondary-subtle" : "bg-white"}`}
            style={{ boxShadow: "none" }}
          />
        </InputGroup>

        {/* search result list */}
        {renderSearchList()}
      </div>
    </>
  )
}