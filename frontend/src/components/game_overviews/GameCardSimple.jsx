import {Link} from "react-router";
import {Card} from "react-bootstrap";
import DefaultImg from "../../assets/placeholder.svg";
import "../../App.css";

import AchievementFooter from "./AchievementFooter.jsx";
import SplitTitle from "./SplitTitle.jsx";
import TagBadges from "./TagBadges.jsx";


export default function GameCardSimple ({ imgSrc, title, tags, currentAchievements, maxAchievements, gameId }) {
  return (
    <Card
      as={Link} to={`/games/${gameId}`}
      className="shadow-sm h-100 card-hover text-decoration-none d-flex flex-column"
    >
      <div className="px-3 pt-2 pb-1 flex-grow-1">
        <div className="d-flex flex-column justify-content-center" style={{ minHeight: "2.5rem" }}>
          <SplitTitle title={title} />
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
          <div className="pt-1 m-0 small d-flex gap-1 overflow-hidden mb-1">
            <TagBadges tags={tags} />
          </div>
        </Card.Body>
      </div>

      {/* achievement information */}
      <AchievementFooter max={maxAchievements} current={currentAchievements} />
    </Card>
  )
}