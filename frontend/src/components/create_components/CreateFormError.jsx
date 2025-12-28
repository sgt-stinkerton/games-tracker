import {Card} from "react-bootstrap";
import CreateFormBase from "./CreateFormBase.jsx";
import FormTop from "./FormTop.jsx";

export default function CreateFormError ({ nextStep, handleInput, error }) {
  return (
    <CreateFormBase>
      <FormTop title="Something Went Wrong" iconName="XCircle" />
      <Card.Body>
        <p>error occurred</p>
      </Card.Body>
    </CreateFormBase>
  );
}