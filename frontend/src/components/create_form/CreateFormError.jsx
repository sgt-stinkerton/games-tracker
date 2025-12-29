import {Button, Card} from "react-bootstrap";

import CreateFormBase from "./CreateFormBase.jsx";
import FormTop from "./FormTop.jsx";
import {Link} from "react-router";

export default function CreateFormError ({ nextStep, handleInput, error }) {
  return (
    <CreateFormBase>
      <FormTop title="Something Went Wrong" iconName="XCircle" />
      <Card.Body>
        <p>An error has occurred: {error}</p>
        <Button size="lg" as={Link} to={`/add`}>Go To Beginning</Button>
      </Card.Body>
    </CreateFormBase>
  );
}