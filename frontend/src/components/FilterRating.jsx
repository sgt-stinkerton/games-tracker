import { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import FilterDropdown from "./FilterDropdown";

export default function FilterRating({ onFilterChange }) {
  const ratingTypes = [
    "rating", "enjoyment", "gameplay",
    "story", "visuals", "sound"
  ];

  // helper to set up rating type dict
  const getInitialFilters = () => {
    const init = {};
    ratingTypes.forEach(type => {
      init[type] = {min: "", max: ""};
    });
    return init;
  };

  const [filters, setFilters] = useState(getInitialFilters);

  // iterate through types of ratings
  useEffect(() => {
    const filtersAsNum = {};
    Object.keys(filters).forEach(type => {
      const {min, max} = filters[type];
      // don't include as filter if neither is set
      if (min !== "" || max !== "") {
        filtersAsNum[type] = {
          min: min !== "" ? Number(min) : null,
          max: max !== "" ? Number(max) : null
        };
      }
    });
    onFilterChange(filtersAsNum);
  }, [filters]);

  // prev used heavily to not overwrite any other filters when changing one
  const handleChange = (type, field, value) => {
    setFilters(prev => {
      const typeToUpdate = prev[type];
      return {
        ...prev,
        [type]: {...typeToUpdate, [field]: value}}
    });
  };

  const handleReset = () => setFilters(getInitialFilters);

  return (
    <FilterDropdown type="Ratings" onReset={handleReset}>
      <div className="d-flex flex-column gap-2">
        {ratingTypes.map((type) => (
          <Row key={type} className="align-items-center">

            {/* each type of rating */}
            <Col xs={4}>
              <Form.Label className="m-0 fw-bold text-secondary text-capitalize">
                {type}
              </Form.Label>
            </Col>

            {/* minimum of rating type */}
            <Col xs={3}>
              <Form.Control type="number" min="0" max="10" step="0.5" placeholder="0"
                className="bg-secondary-subtle text-center p-1"
                value={filters[type].min}
                onChange={(e) => handleChange(type, 'min', e.target.value)}/>
            </Col>

            <Col xs={2} className="text-center"> – </Col>

            {/* maximum of rating type */}
            <Col xs={3}>
              <Form.Control type="number" min="0" max="10" step="0.5" placeholder="10"
                className="bg-secondary-subtle text-center p-1"
                value={filters[type].max}
                onChange={(e) => handleChange(type, 'max', e.target.value)}
              />
            </Col>
          </Row>
        ))}
      </div>
    </FilterDropdown>
  );
}