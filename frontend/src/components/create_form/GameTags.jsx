import {Card} from "react-bootstrap";
import CreateFormBase from "./CreateFormBase.jsx";
import FormTop from "./FormTop.jsx";
import TagSearch from "../TagSearch.jsx";

export default function GameTags ({ prevStep, nextStep, handleInput, formData }) {
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
        <TagSearch formData={formData} setFormData={handleInput} marginProp="mb-3" />
      </Card.Body>
    </CreateFormBase>
  );
}