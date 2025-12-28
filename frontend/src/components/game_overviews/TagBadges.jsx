import {Badge} from "react-bootstrap";

export default function TagBadges ({ tags }) {
  return (
    <>
      {tags.length > 0 ? (
        tags.map(tag => (
          <Badge key={tag} bg="light" text="dark" className="border">
            {tag}
          </Badge>
        ))
      ) : (
        <span className="text-muted small fst-italic">No tags found.</span>
      )}
    </>
  )
}