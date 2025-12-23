import {Card} from "react-bootstrap";
import CreateFormBase from "./CreateFormBase.jsx";

export default function CreateFormError ({ nextStep, handleInput, error }) {
  return (
    <CreateFormBase>
      <Card>
        <p>error occurred</p>
      </Card>
    </CreateFormBase>
  );
}