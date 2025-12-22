import {useEffect, useState} from "react";
import {Row, Col, Button} from "react-bootstrap";
import {List, Grid, Search} from "react-bootstrap-icons"

import {gameService} from "../services/gameService.js";
import GameCard from "../components/GameCard.jsx";
import FilterStatus from "../components/FilterStatus.jsx";
import FilterYear from "../components/FilterYear.jsx";
import FilterRating from "../components/FilterRating.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

// TODO error alert

export default function Games ({  }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeFilters, setActiveFilters] = useState({
    status: [],
    genre: [],
    year: { min: null, max: null },
    rating: {}
  });

  const handleFilterChange = (type, newFilters) => {
    setActiveFilters(prev => ({...prev, [type]: newFilters}));
  };

  const visibleEntries = entries.filter(e => {
    // check if status filter is populated
    const matchesStatus = activeFilters.status.length === 0
      ? e.status !== "HIDDEN"
      : activeFilters.status.includes(e.status);

    // todo
    const matchesGenre = true;

    // get the game year and check it against min and max year filter
    const gameYear = parseInt(e.game.releaseYear);
    const {min, max} = activeFilters.year;
    const matchesYear = (!min || gameYear >= min) && (!max || gameYear <= max);

    // get all actively filtered rating types
    const ratingKeys = Object.keys(activeFilters.rating);
    const matchesRating = ratingKeys.length === 0
      ? true
      : ratingKeys.every(key => {
        const {min, max} = activeFilters.rating[key];
        const ratingValue = e[key];

        // skip if the game has no rating (i.e. only shows completed or dropped games)
        if (!ratingValue) return false;

        // value must be >= min, and <= max (if value null, then only one restricting filter applied)
        const GEMin = !min || ratingValue >= min;
        const LEMax = !max || ratingValue <= max;

        return GEMin && LEMax;
      });

    return matchesStatus && matchesGenre && matchesYear && matchesRating;
  })

  useEffect(() => {
    gameService.getAllEntries()
      .then(data => {
        setEntries(data);
        console.log(data);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, []);

  if (loading) {
    <LoadingSpinner />
  }

  return (<>
    <div className="d-flex justify-content-between align-items-baseline">
      <div className="d-flex flex-row align-items-baseline gap-3 mt-1">  {/* do not touch the mt-1 */}
        <h4 className="mb-1">Your Games List</h4>
        <p className="m-0 text-muted">Showing {visibleEntries.length} {visibleEntries.length === 1 ? " game." : " games."}</p>
      </div>

      {/* TODO */}
      <div className="d-flex flex-row gap-3">
        <List size={26} />
        <Grid size={24} />
      </div>
    </div>

    <hr className="my-2"></hr>

    <div className="d-flex justify-content-between align-items-baseline">
      <div className="d-flex align-items-center gap-2">

        {/* TODO */}
        <Button variant="primary" className="px-5 py-0 border me-3">
          Search <Search size={16}/>
        </Button>

        <FilterStatus onFilterChange={filters => handleFilterChange("status", filters)}/>

        {/* TODO */}
        {/*<FilterGenre onFilterChange={filters => handleFilterChange("genre", filters)}/>*/}

        <FilterYear onFilterChange={filters => handleFilterChange("year", filters)}/>

        <FilterRating onFilterChange={filters => handleFilterChange("rating", filters)}/>
      </div>

      {/* TODO */}
      <p className="m-0">Sort: [<>sort type</>]</p>
    </div>

    <hr className="mt-2 mb-3"></hr>

    <Row xs={1} md={4} className="g-4">
      {visibleEntries.map(e => (
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