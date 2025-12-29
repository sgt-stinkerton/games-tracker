import {Card, Form} from "react-bootstrap";
import CreateFormBase from "./CreateFormBase.jsx";
import FormTop from "./FormTop.jsx";
import DefaultImg from "../../assets/placeholder.svg";

export default function GameImage ({ prevStep, nextStep, handleInput, formData }) {
  const submitSection = (e) => {
    e.preventDefault();
    nextStep();
  }

  return (
    <CreateFormBase canPrev={prevStep} canNext={submitSection}>
      <FormTop title="Cover Image" iconName="Image" />
      <Card.Body className="p-2 d-flex flex-column h-100">
        <Form onSubmit={submitSection} className="d-flex flex-column justify-content-between">
          <img
            src={formData.headerImageUrl || DefaultImg}
            alt="User-pasted image"
            className="rounded-1"
            style={{ height: "215px" , width: "100%", objectFit: "cover"}}
          />

          <Form.Group className="mt-2">
            <Form.Control
              type="text"
              name="headerImageUrl"
              className="bg-white"
              value={formData.headerImageUrl}
              placeholder="Paste in an image address..."
              onChange={handleInput}
              maxLength={255}
            />
          </Form.Group>
          <p className="text-muted small mt-1 text-center">
            Right click on any web image, and click 'Copy image address'.
          </p>
        </Form>
      </Card.Body>
    </CreateFormBase>
  );
}