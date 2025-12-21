import {useEffect, useState} from 'react';
import {Row, Col, Form} from 'react-bootstrap';
import FilterDropdown from './FilterDropdown';

export default function FilterYear({ onFilterChange }) {
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");

  // something about handling min and max
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

      <style>{`
        /* Everything except Firefox */
        .no-arrow::-webkit-outer-spin-button,
        .no-arrow::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        /* Firefox */
        .no-arrow {
          -moz-appearance: textfield;
        }
      `}</style>

      <Row className="g-3 align-items-center">
        <Col xs={5}>
          <Form.Control type="number" placeholder="from" value={minYear}
                        onChange={(e) => setMinYear(e.target.value)}
                        className="text-white bg-secondary-subtle no-arrow"
          />
        </Col>

        <Col xs={2} className="text-center">
          –
        </Col>

        <Col xs={5}>
          <Form.Control type="number" placeholder="to" value={maxYear}
                        onChange={(e) => setMaxYear(e.target.value)}
                        className="text-white bg-secondary-subtle no-arrow"
          />
        </Col>
      </Row>
    </FilterDropdown>
  );
}