import {Card} from 'react-bootstrap';
import {BoxArrowInRight} from 'react-bootstrap-icons';
import {Link} from 'react-router';
import DefaultImg from '../assets/mgsv.jpeg';

// TODO if a title has : or - then separate the lines

export default function GameCard ({ imgSrc=null, title, status, releaseYear, genres, currentAchievements="?", maxAchievements=null, gameId }) {
  return (
    <Card className="shadow-sm h-100">
      <div className="px-3 pt-3 pb-1">
        <p className="text-uppercase fw-bold mb-1 lh-sm">{title}</p>

        <div className="rounded-3">
          <Card.Img src={imgSrc || DefaultImg} alt={"header image for " + title} />
        </div>

        <Card.Body className="p-0">
          <div className="d-flex justify-content-between py-1">
            <p className="m-0 small fw-bold">{status}</p>
            <p className="m-0 small fw-bold">{releaseYear}</p>
          </div>

          <hr className="m-0 p-0"></hr>

          <div className="py-1 m-0 small">
            <p className="m-0 small fw-bold">{genres}</p>
          </div>
        </Card.Body>
      </div>

      <Card.Footer className="px-3 py-1">
        {/* TODO achievement progress bar */}
        <div className="d-flex text-end justify-content-between align-items-center my-1 small">
          <p className="m-0 small text-start">
            {maxAchievements
              ? (`${currentAchievements}/${maxAchievements} Achievements`)
              : (`No Steam data found.`)
            }
          </p>
          <Link to={`/games/${gameId}`}>
            <BoxArrowInRight size={24} fill="secondary" />
          </Link>
        </div>
      </Card.Footer>
    </Card>
  )
}