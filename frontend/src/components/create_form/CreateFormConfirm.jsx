import {Button, Card} from "react-bootstrap";
import {getTagsString} from "../../services/utilities.js";
import CreateFormBase from "./CreateFormBase.jsx";
import FormTop from "./FormTop.jsx";

export default function CreateFormConfirm ({ prevStep, formData, confirm }) {
  return (
    <CreateFormBase canPrev={prevStep}>
      <FormTop title="Confirm Creation" iconName="QuestionCircle" />
      <Card.Body
        className="m-2 p-3 bg-secondary-subtle rounded-3 d-flex flex-column mb-3"
        style={{ overflow: "auto" }}
      >
        <span><strong>Title:</strong> {formData.title}</span>
        <span><strong>Release Year:</strong> {formData.releaseYear || "N/A"}</span>
        <span><strong>Tags:</strong> {formData.tags.length ? getTagsString(formData.tags) : "N/A"}</span>
        <span><strong>Status:</strong> {formData.status.replace("_", " ")}</span>
        {formData.status === "PLAYING" && (
          <div>
            <span><strong>Notes:</strong> {formData.notes || "N/A"}</span>
          </div>
        )}
        {(formData.status === "COMPLETED" || formData.status === "DROPPED") && (
          <div className="d-flex flex-column mt-3">
            <span><strong>Review:</strong> {formData.reviewText || "N/A"}</span>
            <span><strong>Finish Date:</strong> {formData.finishDate || "N/A"}</span>
            <span><strong>Rating:</strong> {formData.rating ? formData.rating + "/10 stars" : "N/A"}</span>
            <span><strong>Enjoyment:</strong> {formData.enjoyment ? formData.enjoyment + "/10 stars" : "N/A"}</span>
            <span><strong>Gameplay:</strong> {formData.gameplay ? formData.gameplay + "/10 stars" : "N/A"}</span>
            <span><strong>Story:</strong> {formData.story ? formData.story + "/10 stars" : "N/A"}</span>
            <span><strong>Visuals:</strong> {formData.visuals ? formData.visuals + "/10 stars" : "N/A"}</span>
            <span><strong>Sound:</strong> {formData.sound ? formData.sound + "/10 stars" : "N/A"}</span>
          </div>
        )}
      </Card.Body>
      <div className="d-flex justify-content-center">
        <Button size="lg" onClick={confirm} style={{ maxWidth: "fit-content" }}>
          Create Game
        </Button>
      </div>
    </CreateFormBase>
  );
}