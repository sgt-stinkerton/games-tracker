import {Card} from "react-bootstrap";
import CreateFormBase from "./CreateFormBase.jsx";
import {useState} from "react";

import FilterTags from "../filter_components/FilterTags.jsx";
import FormTop from "./FormTop.jsx";

export default function GameTags ({ prevStep, nextStep, handleInput, formData, tags, setTags }) {
  const [error, setError] = useState(null); // TODO

  const submitSection = (e) => {
    e.preventDefault();

    // todo add tags

    nextStep();
  }

  return (
    <CreateFormBase canPrev={prevStep} canNext={submitSection}>
      <FormTop title="Add Tags" iconName="Tag" />
      <p className="m-0">{error}</p>
      <Card.Body className="p-2">
        <FilterTags isDropdown={false} onFilterChange={setTags} initialState={tags} />
      </Card.Body>
    </CreateFormBase>
  );
}