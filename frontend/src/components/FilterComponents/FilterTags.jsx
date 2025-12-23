import {useEffect, useState} from "react";
import {Form, ListGroup} from "react-bootstrap";
import {searchTags} from "../../services/utilities.js";
import FilterDropdown from "./FilterDropdown.jsx";

export default function FilterTags({ initialState, onFilterChange }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [activeFilters, setActiveFilters] = useState(initialState || []);

  // updates menu when user removes filter by clicking on little grey button
  useEffect(() => {
    setActiveFilters(initialState || []);
  }, [initialState]);

  useEffect(() => {
    onFilterChange(activeFilters);
  }, [activeFilters]);

  const handleReset = () => {
    setSearchResults(null);
    setSearch("");
    setActiveFilters([]);
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
    if (!activeFilters.includes(tag)) {
      const list = [...activeFilters, tag];
      setActiveFilters(list);
    }
    setSearchResults(null);
    setSearch("");
  }

  const renderSearchList = () => {
    if (!searchResults) return;

    // don't include tags that are already in filtered list
    const res = searchResults.filter(x => !activeFilters.includes(x));

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

      {activeFilters.length > 0 && (
        <div className="d-flex flex-wrap gap-1 mt-3">
          {activeFilters.map(t => (
            <span
              key={t}
              className="badge bg-secondary"
              onClick={() => setActiveFilters(prev => prev.filter(x => x !== t))}
              style={{cursor: 'pointer'}}>
              {t} &times;
            </span>
          ))}
        </div>
      )}
    </FilterDropdown>
  );
}