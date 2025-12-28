import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { userService } from "../services/userService.js";
import { entryService } from "../services/entryService.js";

import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import CommonPageHeader from "../components/common/CommonPageHeader.jsx";
import GameCardSimple from "../components/game_overviews/GameCardSimple.jsx";

export default function Home() {
  const [user, setUser] = useState(null);
  const [playing, setPlaying] = useState([]);
  const [next, setNext] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // todo

  useEffect(() => {
    userService.getUserInfo()
      .then(data => setUser(data))
      .catch(error => setError(error))
  }, []);

  // get currently playing and up next games
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [playingData, nextData] = await Promise.all([
          entryService.getAllPlaying(),
          entryService.getAllNext()
        ]);
        setPlaying(playingData);
        setNext(nextData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!user || loading) return <LoadingSpinner />

  const displayGameNum = (num) => {
    return num === 1 ? "1 game" : num + " games";
  }

  const GameCarousel = ({ title, items }) => {
    const [startIx, setStartIx] = useState(0);
    const MAX_ITEMS = 4;
    const GAP_SIZE = "0.75rem";
    const furthestIx = Math.max(0, items.length - MAX_ITEMS);

    // back scroll button
    const canPrev = startIx > 0;
    const handlePrev = () => setStartIx(prev =>
      Math.max(prev - 1, 0));

    // forward scroll button
    const canNext = startIx < furthestIx;
    const handleNext = () => setStartIx(prev =>
      Math.min(prev + 1, furthestIx));

    // no games in a list
    if (items.length === 0) {
      return (
        <section>
          <h5 className="m-0 mx-3 mb-3">{title}
            <span className="small text-secondary ms-2">({displayGameNum(items.length)})</span>
          </h5>
          <div className="py-5 rounded-4 bg-light text-center mx-3">
            <p className="text-muted fw-bold mb-2">No games found.</p>
            <Button variant="secondary" href="/#/games">Go to Games</Button>
          </div>
        </section>
      );
    }

    // game list is populated
    return (
      <section>
        {/* header */}
        <div className="d-flex justify-content-between align-items-end mb-1 mt-3 px-3">
          <h5 className="m-0">{title}
            <span className="small text-secondary ms-2">({displayGameNum(items.length)})</span>
          </h5>
          {items.length > MAX_ITEMS && (
            <div className="d-flex gap-2">
              <Button variant="secondary" className="d-flex" onClick={handlePrev} disabled={!canPrev}>
                <ArrowLeft size={16} />
              </Button>
              <Button variant="secondary" className="d-flex" onClick={handleNext} disabled={!canNext}>
                <ArrowRight size={16} />
              </Button>
            </div>
          )}
        </div>

        {/* carousel */}
        <div className="overflow-hidden pt-2 pb-4 px-3">
          <div className="d-flex"
               style={{
                 marginLeft: `-${GAP_SIZE}`, marginRight: `-${GAP_SIZE}`,
                 transform: `translateX(-${startIx * (100 / MAX_ITEMS)}%)`,
                 transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)"}}>
            {items.map(e => (
              <div key={e.id} style={{flex: `0 0 ${100 / MAX_ITEMS}%`, paddingLeft: GAP_SIZE, paddingRight: GAP_SIZE}}>
                <GameCardSimple
                  imgSrc={e.game.headerImageUrl}
                  title={e.game.title}
                  currentAchievements={e.currentAchievements}
                  maxAchievements={e.game.steamAchievements}
                  tags={e.game.tags}
                  gameId={e.game.id}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <CommonPageHeader title={`Welcome back, ${user.displayName}!`} />
      <GameCarousel title="Currently Playing" items={playing}/>
      <div className="my-2"></div>
      <GameCarousel title="Up Next" items={next}/>
    </>
  );
}