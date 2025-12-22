import {useEffect, useState} from "react";
import {Row, Col, Button} from "react-bootstrap";
import {List, Grid, Search} from "react-bootstrap-icons"
import {gameService} from "../services/gameService.js";
import "../index.css";

import GameCard from "../components/GameCard.jsx";
import FilterStatus from "../components/FilterStatus.jsx";
import FilterYear from "../components/FilterYear.jsx";
import FilterRating from "../components/FilterRating.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import {GameListItem} from "../components/GameListItem.jsx";

// TODO error alert

export default function Games ({  }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // saved in session storage so that refreshing a page doesn't reset everything
  const [view, setView] = useState(() => {
    return sessionStorage.getItem("games_view") || "grid";
  });
  const [activeSort, setActiveSort] = useState(() => {
    return sessionStorage.getItem("games_sort") || "Title ASC";
  });
  const [activeFilters, setActiveFilters] = useState(() => {
    const saved = sessionStorage.getItem("games_filters");
    return saved ? JSON.parse(saved) : {
      status: [],
      genre: [],
      year: { min: null, max: null },
      rating: {}
    }
  })

  useEffect(() => {
    sessionStorage.setItem("games_view", view);
  }, [view]);

  useEffect(() => {
    sessionStorage.setItem("games_sort", activeSort);
  }, [activeSort]);

  useEffect(() => {
    sessionStorage.setItem("games_filters", JSON.stringify(activeFilters));
  }, [activeFilters]);


  const handleFilterChange = (type, newFilters) => {
    setActiveFilters(prev => ({...prev, [type]: newFilters}));
  };

  // big filtering chunk
  const visibleEntries = entries.filter(e => {
    // status
    const matchesStatus = activeFilters.status.length === 0
      ? e.status !== "HIDDEN"
      : activeFilters.status.includes(e.status);

    // todo
    const matchesGenre = true;

    // year
    const gameYear = parseInt(e.game.releaseYear);
    const {min, max} = activeFilters.year;
    const matchesYear = (!min || gameYear >= min) && (!max || gameYear <= max);

    // rating
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
    .sort((a, b) => {
      const [type, dir] = activeSort.split(" ");
      let result = 0;

      if (type === "Year") {
        const yearA = parseInt(a.game.releaseYear) || 0;
        const yearB = parseInt(b.game.releaseYear) || 0;
        result = yearA - yearB;

      } else if (type === "Rating") {
        const rateA = a.rating || 0;
        const rateB = b.rating || 0;
        result = rateA - rateB;

      } else {
        // default to title
        const titleA = a.game.title.toLowerCase();
        const titleB = b.game.title.toLowerCase();
        result = titleA.localeCompare(titleB);
      }

      return dir === "DESC" ? -result : result;
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

  if (loading) return <LoadingSpinner />

  return (<>
    <div className="d-flex justify-content-between align-items-baseline">
      <div className="d-flex flex-row align-items-baseline gap-3 mt-1">  {/* do not touch the mt-1 */}
        <h4 className="mb-1">Your Games List</h4>
        <p className="m-0 text-muted">Showing {visibleEntries.length} {visibleEntries.length === 1 ? " game." : " games."}</p>
      </div>

      <div className="d-flex flex-row gap-3">
        <Grid className="view-hover" onClick={() => setView("grid")} size={24} />
        <List className="view-hover" onClick={() => setView("list")} size={26} />
      </div>
    </div>

    <hr className="my-2"></hr>

    <div className="d-flex justify-content-between align-items-baseline">
      <div className="d-flex align-items-center gap-2">

        {/* TODO */}
        <Button variant="primary" className="px-5 py-0 border me-3">
          Search <Search size={16}/>
        </Button>

        <FilterStatus
          initialState={activeFilters.status}
          onFilterChange={filters => handleFilterChange("status", filters)}
        />

        {/* TODO */}
        {/*<FilterGenre*/}
        {/*  initialState={activeFilters.genre}*/}
        {/*  onFilterChange={filters => handleFilterChange("genre", filters)}*/}
        {/*/>*/}

        <FilterYear
          initialState={activeFilters.year}
          onFilterChange={filters => handleFilterChange("year", filters)}
        />

        <FilterRating
          initialState={activeFilters.rating}
          onFilterChange={filters => handleFilterChange("rating", filters)}
        />
      </div>

      <SortDropdown currentSort={activeSort} onSortChange={setActiveSort} />
    </div>

    <hr className="mt-2 mb-3"></hr>

    {view === "grid" ? (
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
    ) : (
      <Row md={2} className="g-2">
        {visibleEntries.map(e => (
          <Col key={e.id}>
            <GameListItem
              imgSrc={null}  // TODO
              title={e.game.title}
              status={e.status}
              releaseYear={e.game.releaseYear}
              genres={"Action, Tactical, Stealth"}  // TODO
              gameId={e.game.id} />
          </Col>
        ))}
      </Row>
    )}
  </>)
}