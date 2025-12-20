import { gameService } from "../services/gameService.js";
import {useEffect, useState} from "react";
import {Row, Col, Spinner, Button} from 'react-bootstrap';
import {List, ListUl, Grid} from 'react-bootstrap-icons'
import GameCard from "../components/GameCard.jsx";

// TODO error alert
// TODO hidden games are only shown when filtering

export default function Games ({  }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    gameService.getAll()
      .then(data => {
        setEntries(data);
        console.log(data);
      })
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
    <div className="d-flex justify-content-between align-items-baseline">
      <div className="d-flex flex-row align-items-baseline gap-3">
        <h4 className="mb-1">Your Games List</h4>
        <p className="m-0 text-muted">Showing {entries.length} {entries.length === 1 ? " game." : " games."}</p>
      </div>

      <div className="d-flex flex-row gap-3">
        <List size={26} /> {/* TODO */}
        <Grid size={24} /> {/* TODO */}
      </div>
    </div>

    <hr className="mt-2 mb-3"></hr>

    <div className="d-flex justify-content-between align-items-baseline">
      <div className="d-flex align-items-center gap-2">
        <Button variant="primary" className="px-5 py-1 border me-3">Search</Button> {/* TODO */}
        <Button variant="secondary" className="px-3 py-1">Status</Button> {/* TODO */}
        <Button variant="secondary" className="px-3 py-1">Genre</Button> {/* TODO */}
        <Button variant="secondary" className="px-3 py-1">Release Year</Button> {/* TODO */}
        <Button variant="secondary" className="px-3 py-1">Your Rating</Button> {/* TODO */}
      </div>
      <p className="m-0">Sort: [<>sort type</>]</p> {/* TODO */}
    </div>

    <hr className="my-3"></hr>

    <Row xs={1} md={4} className="g-4">
      {entries.map(e => (
        <Col key={e.id}>
          <GameCard
            imgSrc={null}  // TODO
            title={e.game.title}
            status={e.status}
            releaseYear={e.game.releaseYear}
            currentAchievements={"?"}  // TODO
            maxAchievements={null}  // TODO
            genres={"Action, Tactical, Stealth"}  // TODO
            gameId={e.game.id} />
        </Col>
      ))}
    </Row>
  </>)
}