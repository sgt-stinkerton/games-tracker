import { gameService } from "../services/gameService.js";
import {useEffect, useState} from "react";
import {Row, Col, Spinner} from 'react-bootstrap';
import GameCard from "../components/GameCard.jsx";

export default function Games ({  }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    gameService.getAllGames()
      .then(data => setGames(data))
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
    // </ul>
    <Row xs={1} md={4} lg={4} className="g-4">
      {games && games.map(game => (
        <Col key={game.id}>
          <GameCard
            title={game.title}
            status="PLAYING"
            releaseYear={game.releaseDate}
            genres={"Action, Tactical, Stealth"}
            maxAchievements="42"
            gameId={game.id} />
        </Col>
      ))}
    </Row>
  )
}