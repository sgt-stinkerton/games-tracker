import { gameService } from "../services/gameService.js";
import {useEffect, useState} from "react";
import {Row, Col, Spinner, Button} from 'react-bootstrap';
import GameCard from "../components/GameCard.jsx";

// TODO error alert
// TODO hidden games are only shown when filtering
// TODO button that flattens card view into list, and unflattens list into grid card view

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

  return (<>
    <div className="bg-light rounded-3 shadow p-3 mb-4 d-flex flex-row align-items-center justify-content-between">
      <div className="d-flex flex-row gap-3">
        <h3 className="mb-1">Your Games List</h3>
        <Button>Sort by dropdown</Button> {/* TODO */}
        <Button>Add</Button> {/* TODO */}
      </div>
      <div className="d-flex flex-row justify-content-end gap-3">
        <Button>Search</Button> {/* TODO */}
        <Button>Filter Menu</Button> {/* TODO */}
      </div>
    </div>

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
  </>)
}