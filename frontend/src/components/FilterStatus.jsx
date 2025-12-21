import {useState} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import FilterDropdown from './FilterDropdown';

export default function FilterStatus({ onFilterChange }) {
  const [activeFilters, setActiveFilters] = useState([]);

  // list of possible statuses
  const statuses = [
    "TO_PLAY", "UP_NEXT", "PLAYING",
    "COMPLETED", "DROPPED", "HIDDEN"
  ];

  const toggleStatus = (status) => {
    // check if toggle is adding or removing filter
    let selection;
    if (activeFilters.includes(status)) {
      selection = activeFilters.filter(s => s !== status);
    } else {
      selection = [...activeFilters, status];
    }

    // save filter change
    setActiveFilters(selection);
    onFilterChange(selection);
  };

  const handleReset = () => {
    setActiveFilters([]);
    onFilterChange([]);
  };

  return (
    <FilterDropdown type="Status" onReset={handleReset}>
      <Row className="g-2">
        {statuses.map(status => {
          // check if current button is active for styling
          const isActive = activeFilters.includes(status);

          return (
            <Col xs={6} key={status}>
              <Button
                variant={isActive ? "primary" : "secondary"}
                className={`w-100 ${isActive ? "opacity-100 fw-bold" : "opacity-75"}`}
                onClick={() => toggleStatus(status)}
              >
                {status.replace("_", " ")}
              </Button>
            </Col>
          )
        })}
      </Row>
    </FilterDropdown>
  );
}