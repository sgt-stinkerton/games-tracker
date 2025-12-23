import {Button, Card} from "react-bootstrap";
import CreateFormBase from "./CreateFormBase.jsx";

export default function CreateFormConfirm ({ prevStep, formData, tags, confirm }) {
  return (
    <CreateFormBase canPrev={prevStep}>
      <h4>Confirm Data</h4>
      <Card.Body className="p-2" style={{ overflow: "auto" }}>
        <p>title {formData.title}</p>
        <p>year {formData.releaseYear}</p>
        <p>tags {tags}</p>
        <p>status {formData.status}</p>
        {formData.status === "PLAYING" && (
          <>
            <p>notes {formData.notes}</p>
          </>
        )}
        {(formData.status === "COMPLETED" || formData.status === "DROPPED") && (
          <>
            <p>review text {formData.reviewText}</p>
            <p>finish date {formData.finishDate}</p>
            <p>rating {formData.rating}</p>
            <p>enjoyment {formData.enjoyment}</p>
            <p>gameplay {formData.gameplay}</p>
            <p>story {formData.story}</p>
            <p>visuals {formData.visuals}</p>
            <p>sound {formData.sound}</p>
          </>
        )}
      </Card.Body>
      <Button onClick={confirm}>
        Create Game
      </Button>
    </CreateFormBase>
  );
}