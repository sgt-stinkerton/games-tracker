import {Button} from "react-bootstrap";

export default function ClearDate({ handleInput }) {
  return (
    <Button variant="outline-secondary" onClick={handleInput} className="ms-1 px-2 py-1">
      Clear
    </Button>
  )
}