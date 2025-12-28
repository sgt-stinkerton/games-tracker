import {useEffect, useState} from "react";
import {Row, Col, Form} from "react-bootstrap";
import {List, Grid} from "react-bootstrap-icons"
import {entryService} from "../services/entryService.js";
import "../App.css";

import GameCard from "../components/game_overviews/GameCard.jsx";
import FilterBadge from "../components/filters/FilterBadge.jsx";
import FilterStatus from "../components/filters/FilterStatus.jsx";
import FilterYear from "../components/filters/FilterYear.jsx";
import FilterRating from "../components/filters/FilterRating.jsx";
import FilterTags from "../components/filters/FilterTags.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import SortDropdown from "../components/filters/SortDropdown.jsx";
import GameListItem from "../components/game_overviews/GameListItem.jsx";

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
  const [search, setSearch] = useState(() => {
    return sessionStorage.getItem("games_search") || "";
  });
  const [activeFilters, setActiveFilters] = useState(() => {
    const saved = sessionStorage.getItem("games_filters");
    return saved ? JSON.parse(saved) : {
      status: [],
      tags: [],
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
    sessionStorage.setItem("games_search", search);
  }, [search]);

  useEffect(() => {
    sessionStorage.setItem("games_filters", JSON.stringify(activeFilters));
  }, [activeFilters]);

  const handleFilterChange = (type, newFilters) => {
    setActiveFilters(prev => ({...prev, [type]: newFilters}));
  };

  // big filtering chunk
  const visibleEntries = entries.filter(e => {
    // search (title)
    const matchesSearch = search === ""
      || e.game.title.toLowerCase().includes(search.toLowerCase());

    // status
    const matchesStatus = activeFilters.status.length === 0
      ? e.status !== "HIDDEN"
      : activeFilters.status.includes(e.status);

    const matchesTags = activeFilters.tags.length === 0
      ? true
      : e.game.tags.some(tag => activeFilters.tags.includes(tag));

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

    return matchesSearch && matchesStatus && matchesTags && matchesYear && matchesRating;
  })
    .sort((a, b) => {
      const [type, dir] = activeSort.split(" ");
      const isDesc = dir === "DESC";

      const getValue = (entry) => {
        switch (type) {
          case "Year":
            return parseInt(entry.game.releaseYear) || null;
          case "Rating":
            return entry.rating || null;
          case "Finish-Date":
            return entry.finishDate ? new Date(entry.finishDate).getTime() : null;
          case "Achievement-%":
            const max = parseInt(entry.game.steamAchievements) || 0;
            return max > 0 ? (parseInt(entry.currentAchievements) || 0) / max : null;
          default: // title
            return entry.game.title.toLowerCase();
        }
      };

      const valA = getValue(a);
      const valB = getValue(b);

      if (type.includes("Title")) {
        return isDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
      }

      if (valA === null && valB !== null) return 1;
      if (valA !== null && valB === null) return -1;
      if (valA === null && valB === null) return 0;

      return isDesc ? valB - valA : valA - valB;
    })

  // logic taken out of the rendering
  const getFilterBadges = () => {
    const badges = [];

    activeFilters.status.forEach(s => badges.push({
      key: `status-${s}`,
      text: `status = ${s.replace("_", " ")}`,
      onRemove: () => setActiveFilters(prev => ({
        ...prev, status: prev.status.filter(x => x !== s)}))
    }));

    activeFilters.tags.forEach(t => badges.push({
      key: `tag-${t}`,
      text: t,
      onRemove: () => setActiveFilters(prev => ({
        ...prev, tags: prev.tags.filter(x => x !== t)}))
    }));

    const {min: minYear, max: maxYear} = activeFilters.year;
    if (minYear) {badges.push({
      key: "min-year",
      text: `year >= ${minYear}`,
      onRemove: () => setActiveFilters(prev => ({
        ...prev, year: {...prev.year, min: null}}))
    })}
    if (maxYear) {badges.push({
      key: "max-year",
      text: `year <= ${maxYear}`,
      onRemove: () => setActiveFilters(prev => ({
        ...prev, year: {...prev.year, max: null}}))
    })}

    Object.keys(activeFilters.rating).forEach(type => {
      const {min, max} = activeFilters.rating[type];
      if (min) {badges.push({
        key: `min-${type}`,
        text: `${type} >= ${min}`,
        onRemove: () => setActiveFilters(prev => ({
          ...prev, rating: {...prev.rating, [type]: {...prev.rating[type], min: null}}}))
      })}
      if (max) {badges.push({
        key: `max-${type}`,
        text: `${type} <= ${max}`,
        onRemove: () => setActiveFilters(prev => ({
          ...prev, rating: {...prev.rating, [type]: {...prev.rating[type], max: null}}}))
      })}
    })

    return badges;
  }

  const activeBadges = getFilterBadges();

  useEffect(() => {
    entryService.getAllEntries()
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
        <h4 className="mb-1">Your Games</h4>
        <p className="m-0 text-muted">Showing {visibleEntries.length} {visibleEntries.length === 1 ? " game." : " games."}</p>
      </div>

      <div className="d-flex flex-row gap-3">
        <Grid className="view-hover" onClick={() => setView("grid")} size={24} />
        <List className="view-hover" onClick={() => setView("list")} size={26} />
      </div>
    </div>

    <hr className="my-2"></hr>

    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-baseline">
        <div className="d-flex align-items-center gap-2">
          {/* search bar */}
          <Form.Control
            type="text"
            placeholder="Search game titles..."
            className="px-2 p-1"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <FilterStatus
            initialState={activeFilters.status}
            onFilterChange={filters => handleFilterChange("status", filters)}
          />
          <FilterTags
            initialState={activeFilters.tags}
            onFilterChange={filters => handleFilterChange("tags", filters)}
          />
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

      <div className="d-flex flex-row flex-wrap">
        {activeBadges.map(badge => (
          <FilterBadge key={badge.key} onClick={badge.onRemove}>
            {badge.text}
          </FilterBadge>
        ))}
      </div>
    </div>

    <hr className="mt-2 mb-3"></hr>

    {view === "grid" ? (
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {visibleEntries.map(e => (
          <Col key={e.id}>
            <GameCard
              imgSrc={e.game.headerImageUrl}
              title={e.game.title}
              status={e.status}
              releaseYear={e.game.releaseYear}
              currentAchievements={e.currentAchievements}
              maxAchievements={e.game.steamAchievements}
              tags={e.game.tags}
              gameId={e.game.id} />
          </Col>
        ))}
      </Row>
    ) : (
      <Row sm={1} md={2} className="g-3">
        {visibleEntries.map(e => (
          <Col key={e.id}>
            <GameListItem
              imgSrc={e.game.headerImageUrl}
              title={e.game.title}
              status={e.status}
              releaseYear={e.game.releaseYear}
              tags={e.game.tags}
              gameId={e.game.id}
            />
          </Col>
        ))}
      </Row>
    )}
  </>)
}