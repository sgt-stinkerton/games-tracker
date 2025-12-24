import {Link} from "react-router";
import {getStatusColor} from "../services/utilities.js";
import DefaultImg from "../assets/placeholder.svg";
import "../App.css";

export function GameListItem({imgSrc, title, status, releaseYear, tags, gameId}) {

  // render series section of a title smaller (if it exists)
  const splitIx = title.indexOf(":");
  let renderedTitle;
  if (splitIx !== -1) {
    renderedTitle = (<>
      <h5 className="text-uppercase fw-bold lh-1 m-0">{title.substring(0, splitIx + 1)}</h5>
      <p className="text-uppercase fw-bold lh-1 m-0">{title.substring(splitIx + 1).trim()}</p>
    </>)
  } else {
    renderedTitle = <>
      <h5 className="text-uppercase fw-bold lh-1 m-0">{title}</h5>
    </>
  }

  return (
    <Link
      as={Link} to={`/games/${gameId}`}
      className="d-flex bg-body justify-content-between border border-secondary-subtle p-2 rounded-1 h-100 game-list-item text-decoration-none text-reset"
    >
      <div className="d-flex justify-content-start gap-2">
        <img
          src={imgSrc || DefaultImg}
          alt={"header image for " + title}
          className="rounded-1"
          style={{height: "65px", objectFit: "cover"}}
        />

        <div className="d-flex flex-column justify-content-between">
          <div className="d-flex flex-column justify-content-start">
            {renderedTitle}
          </div>

          <p className="m-0 small lh-sm">{tags}</p>
        </div>
      </div>

      <div className="d-flex flex-column justify-content-between">
        <p className={`m-0 fw-bold badge rounded-3 ${getStatusColor(status)}`}
           style={{ maxWidth: "fit-content" }}>
          {status.replaceAll("_", " ")}
        </p>

        <div className="d-flex flex-column align-items-end">
          <p className="mb-1 m-0 small lh-1">Released</p>
          <p className="m-0 lh-1 fw-bold">{releaseYear}</p>
        </div>
      </div>
    </Link>
  )
}