import {useEffect, useState} from "react";
import {Row, Col, Form} from "react-bootstrap";
import FilterDropdown from "./FilterDropdown";

export default function FilterYear({ initialState, onFilterChange }) {
  const [minYear, setMinYear] = useState(initialState?.min || "");
  const [maxYear, setMaxYear] = useState(initialState?.max || "");

  useEffect(() => {
    onFilterChange({
      min: minYear ? parseInt(minYear) : null,
      max: maxYear ? parseInt(maxYear) : null
    })
  }, [minYear, maxYear]);

  const handleReset = () => {
    setMinYear("");
    setMaxYear("");
  };

  return (
    <FilterDropdown type="Release Year" onReset={handleReset}>
      <Row className="g-3 align-items-center">
        <Col xs={5}>
          <Form.Control type="number"
                        placeholder="from"
                        value={minYear}
                        onChange={(e) => setMinYear(e.target.value)}
                        className="bg-secondary-subtle no-arrow"/>
        </Col>

        <Col xs={2} className="text-center"> – </Col>

        <Col xs={5}>
          <Form.Control type="number"
                        placeholder="to"
                        value={maxYear}
                        onChange={(e) => setMaxYear(e.target.value)}
                        className="bg-secondary-subtle no-arrow"/>
        </Col>
      </Row>
    </FilterDropdown>
  );
}