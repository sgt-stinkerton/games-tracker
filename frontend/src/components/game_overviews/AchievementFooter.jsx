import {Card, ProgressBar} from "react-bootstrap";

export default function AchievementFooter ({ max, current }) {
  return (
    <>
      {max !== 0 && current > 0 && (
        <ProgressBar
          now={(current/max)*100}
          variant="info"
          className="rounded-0 w-100"
          style={{ height: "3px" }}
        />
      )}
      <Card.Footer className="pb-1 p-0">
        <div className="px-3 d-flex text-end justify-content-between align-items-center mt-1 small">
          <p className="m-0 small text-start">
            {(max !== 0 && max > current && current !== null) && (
              `${current}/${max} Achievements`
            )}
            {max !== 0 && current !== null && max === current && (
              `Unlocked all ${max} achievements.`
            )}
            {(!max || current === null) && (
              `No Steam achievement data found.`
            )}
          </p>
        </div>
      </Card.Footer>
    </>
  )
}