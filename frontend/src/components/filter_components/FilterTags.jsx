import {useEffect, useState} from "react";
import {Form, ListGroup} from "react-bootstrap";
import {searchTags} from "../../services/utilities.js";
import FilterDropdown from "./FilterDropdown.jsx";

export default function FilterTags({ initialState=null, onFilterChange }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [tags, setTags] = useState(initialState || []);

  // updates menu when user removes filter by clicking on little grey button
  useEffect(() => {
    setTags(initialState || []);
  }, [initialState]);

  useEffect(() => {
    onFilterChange(tags);
  }, [tags]);

  const handleReset = () => {
    setSearchResults(null);
    setSearch("");
    setTags([]);
  };

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
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setSearchResults(null);
    setSearch("");
  }

  const renderSearchList = () => {
    if (!searchResults) return;

    // don't include tags that are already in list
    const res = searchResults.filter(x => !tags.includes(x));

    if (!res.length) return (<p className="mt-2 ms-1 m-0">No results.</p>);

    return (
      <ListGroup className="rounded-2" style={{ maxHeight: "35vh", overflowY: "auto" }}>
        {res.map(tag => (
          <ListGroup.Item action key={tag} type="button" onClick={() => addTag(tag)}>
            {tag}
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }

  return (
    <FilterDropdown type="Tags" onReset={handleReset}>
      <Form.Control
        type="text"
        placeholder="Search game tags..."
        className="px-2 p-1"
        value={search}
        onChange={onSearchInput}
      />
      {renderSearchList()}

      {tags.length > 0 && (
        <div className="d-flex flex-wrap gap-1 mt-3">
          {tags.map(t => (
            <span
              key={t}
              className="badge bg-secondary"
              onClick={() => setTags(prev => prev.filter(x => x !== t))}
              style={{cursor: 'pointer'}}>
              {t} &times;
            </span>
          ))}
        </div>
      )}
    </FilterDropdown>
  );
}