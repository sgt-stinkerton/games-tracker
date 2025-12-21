import {Card} from 'react-bootstrap';
import {Link} from 'react-router';
import {getStatusColor} from "../services/utilities.js";
import DefaultImg from '../assets/placeholder.jpg';
import '../index.css';

export default function GameCard ({ imgSrc, title, status, releaseYear, genres, currentAchievements, maxAchievements, gameId }) {

  // render series section of a title smaller (if it exists)
  const splitIx = title.indexOf(":");
  let renderedTitle;
  if (splitIx !== -1) {
    renderedTitle = (<>
      <p className="text-uppercase fw-bold mb-1 lh-1 small">{title.substring(0, splitIx + 1)}</p>
      <p className="text-uppercase fw-bold mb-1 lh-1">{title.substring(splitIx + 1).trim()}</p>
    </>)
  } else {
    renderedTitle = <p className="text-uppercase fw-bold mb-1 lh-sm">{title}</p>
  }

  return (
    <Card
      as={Link} to={`/games/${gameId}`}
      className="shadow-sm h-100 card-hover text-decoration-none"
    >
      <div className="px-3 pt-3 pb-1">
        {renderedTitle}

        {/* image */}
        {/* TODO scrape link from steam? */}
        <div className="rounded-3">
          <Card.Img src={imgSrc || DefaultImg} alt={"header image for " + title} />
        </div>

        {/* brief game information */}
        <Card.Body className="p-0">
          <div className="d-flex justify-content-between py-1">
            <p className={`m-0 small fw-bold badge rounded-3 ${getStatusColor(status)}`}>{status.replaceAll("_", " ")}</p>
            <p className="m-0 small fw-bold">{releaseYear}</p>
          </div>
          <hr className="m-0 p-0"></hr>
          <div className="py-1 m-0 small">
            <p className="m-0 small fw-bold">{genres}</p>
          </div>
        </Card.Body>
      </div>

      {/* achievement information */}
      {/* TODO achievement progress bar */}
      <Card.Footer className="px-3 py-1">
        <div className="d-flex text-end justify-content-between align-items-center my-1 small">
          <p className="m-0 small text-start">
            {maxAchievements
              ? (`${currentAchievements}/${maxAchievements} Achievements (Steam)`)
              : (`No Steam achievement data found.`)
            }
          </p>
        </div>
      </Card.Footer>
    </Card>
  )
}