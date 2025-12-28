import {Button, Card} from "react-bootstrap";
import {Link} from "react-router";
import CreateFormBase from "./CreateFormBase.jsx";
import FormTop from "./FormTop.jsx";

export default function CreateFormComplete ({ nextStep, recentId }) {
  return (
    <CreateFormBase>
      <FormTop title="Created Successfully" iconName="CheckCircle" />

      <Card.Body className="gap-3 mb-5 p-3 d-flex align-items-center justify-content-between">
        {recentId && (
          <Button size="lg" as={Link} to={`/games/${recentId}`}>Go To Game Page</Button>
        )}
        <Button size="lg" onClick={nextStep}>Add Another Game</Button>
      </Card.Body>
    </CreateFormBase>
  );
}