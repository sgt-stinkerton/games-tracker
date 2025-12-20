import {Row, Col} from 'react-bootstrap';
import GameCard from "../components/GameCard.jsx";

export default function Games ({  }) {
  return (
    // <ul>
    //   <li>browse by status</li>
    //   <ul>
    //     <li>to play</li>
    //     <li>up next</li>
    //     <li>currently playing</li>
    //     <li>completed</li>
    //     <li>dropped</li>
    //   </ul>
    //   <li>filter by category</li>
    //   <ul>
    //     <li>action</li>
    //     <li>adventure</li>
    //     <li>puzzle</li>
    //     <li>stealth</li>
    //     <li>etc</li>
    //   </ul>
    //   <li>button that flattens card view into list, and unflattens list into grid card view</li>
    // </ul>
    <Row xs={1} md={4} className="g-4">
      {Array.from({ length: 12 }).map((_, idx) => (
        <Col key={idx}>
          <GameCard
            title={"Metal Gear Solid V: The Phantom Pain"}
            status="PLAYING"
            releaseYear={"2015"}
            genres={"Action, Tactical, Stealth"}
            maxAchievements="42"
            gameId={"1"} />
        </Col>
      ))}
    </Row>
  )
}