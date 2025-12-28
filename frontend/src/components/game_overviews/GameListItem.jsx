import {Link} from "react-router";
import {getStatusColor} from "../../services/utilities.js";
import DefaultImg from "../../assets/placeholder.svg";
import "../../App.css";

import SplitTitle from "./SplitTitle.jsx";
import TagBadges from "./TagBadges.jsx";

export function GameListItem({imgSrc, title, status, releaseYear, tags, gameId}) {
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
            <SplitTitle title={title} />
          </div>

          <div className="pt-1 m-0 small d-flex gap-1 overflow-hidden">
            <TagBadges tags={tags} />
          </div>
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