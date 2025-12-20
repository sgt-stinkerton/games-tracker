import { gameService } from "../services/gameService.js";
import {useEffect, useState} from "react";
import {Row, Col, Spinner} from 'react-bootstrap';
import GameCard from "../components/GameCard.jsx";

export default function Games ({  }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    gameService.getAll()
      .then(data => setEntries(data))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, []);


  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  return (
    // <ul>
    //   <li>browse by status</li>
    //   <li>filter by category</li>
    //   <li>button that flattens card view into list, and unflattens list into grid card view</li>
    //   <li>search filtering</li>
    //   <li>add new game</li>
    //   <li>games with hidden status aren't automatically shown</li>
    // </ul>
    <Row xs={1} md={4} className="g-4">
      {entries && entries.map(e => (
        <Col key={e.id}>
          <GameCard
            imgSrc={null}
            title={e.game.title}
            status={e.status}
            releaseYear={e.game.releaseYear}
            currentAchievements={"?"}
            maxAchievements={null}
            genres={"Action, Tactical, Stealth"}
            gameId={e.game.id} />
        </Col>
      ))}
    </Row>
  )
}