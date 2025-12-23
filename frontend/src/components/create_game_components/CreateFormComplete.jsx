import {Button, Card} from "react-bootstrap";
import {Link} from "react-router";
import CreateFormBase from "./CreateFormBase.jsx";

export default function CreateFormComplete ({ nextStep, recentId }) {
  return (
    <CreateFormBase>
      <h4>Game Created</h4>
      <Card.Body className="p-2">
        <p>game successfully created</p>
      </Card.Body>
      <Button onClick={nextStep}>
        Add Another Game
      </Button>
      {recentId && (
        <Button as={Link} to={`/games/${recentId}`}>
          Go To Game Page
        </Button>
      )}
    </CreateFormBase>
  );
}