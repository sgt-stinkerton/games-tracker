import {Card, ProgressBar} from "react-bootstrap";
import {Link} from "react-router";
import {getStatusColor} from "../services/utilities.js";
import DefaultImg from "../assets/placeholder.svg";
import "../App.css";

export default function GameCard ({ imgSrc, title, status, releaseYear, tags, currentAchievements, maxAchievements, gameId }) {

  // render series section of a title smaller (if it exists)
  const splitIx = title.indexOf(":");
  let renderedTitle;
  if (splitIx !== -1) {
    renderedTitle = (<>
      <p className="text-uppercase fw-bold mb-1 lh-1">{title.substring(0, splitIx + 1)}</p>
      <p className="text-uppercase fw-bold mb-1 lh-1 small">{title.substring(splitIx + 1).trim()}</p>
    </>)
  } else {
    renderedTitle = <>
      <p className="text-uppercase fw-bold mb-1 lh-1">{title}</p>
    </>
  }

  return (
    <Card
      as={Link} to={`/games/${gameId}`}
      className="shadow-sm h-100 card-hover text-decoration-none d-flex flex-column"
    >
      <div className="px-3 pt-2 pb-1 flex-grow-1">
        <div className="d-flex flex-column justify-content-center" style={{ minHeight: "2.5rem" }}>
          {renderedTitle}
        </div>

        {/* image */}
        <div className="rounded-3 mb-1">
          <Card.Img
            src={imgSrc || DefaultImg}
            alt={"header image for " + title}
            style={{ width: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* brief game information */}
        <Card.Body className="p-0">
          <div className="d-flex justify-content-between py-1">
            <p className={`m-0 fw-bold badge rounded-3 ${getStatusColor(status)}`}>
              {status.replaceAll("_", " ")}
            </p>
            <p className="m-0 small fw-bold">{releaseYear}</p>
          </div>
          <hr className="mt-1 mb-0 p-0"></hr>
          <div className="pt-1 m-0 small">
            <p className={`m-0 small ${tags ? "fw-bold" : ""}`}>{tags ? tags : "No tags found."}</p>
          </div>
        </Card.Body>
      </div>

      {/* achievement progress bar */}
      {maxAchievements !== 0 && currentAchievements > 0 && (
        <ProgressBar
          now={(currentAchievements/maxAchievements)*100}
          variant="info"
          className="rounded-0 w-100"
          style={{ height: "3px" }}
        />
      )}

      {/* achievement information */}
      <Card.Footer className="pb-1 p-0">
        <div className="px-3 d-flex text-end justify-content-between align-items-center mt-1 small">
          <p className="m-0 small text-start">
            {maxAchievements !== 0 && maxAchievements > currentAchievements && (
              `${currentAchievements}/${maxAchievements} Achievements`
            )}
            {maxAchievements !== 0 && currentAchievements !== null && maxAchievements === currentAchievements && (
              `Unlocked all ${maxAchievements} achievements.`
            )}
            {!maxAchievements && (
              `No Steam achievement data found.`
            )}
          </p>
        </div>
      </Card.Footer>
    </Card>
  )
}