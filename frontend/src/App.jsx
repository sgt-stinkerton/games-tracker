import {useState} from "react";
import {Route, Routes} from "react-router-dom";

import Home from "./views/Home.jsx";
import Games from "./views/Games.jsx";
import SyncGames from "./views/SyncGames.jsx";
import Reviews from "./views/Reviews.jsx";
import Profile from "./views/Profile.jsx";
import SideBar from "./components/SideBar.jsx";
import ToastSuccess from "./components/ToastSuccess.jsx";
import CreateGame from "./views/CreateGame.jsx";
import GamePage from "./views/GamePage.jsx";

export default function App() {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  return (
    <div className="d-flex p-0">
      <ToastSuccess show={showToast} onClose={() => setShowToast(false)} message={toastMsg} />
      <SideBar />
      <main
        className="p-4 bg-white"
        style={{ marginLeft: '220px', minHeight: '100vh', width: 'calc(100vw - 220px)' }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:gameId" element={<GamePage setShowToast={setShowToast} setToastMsg={setToastMsg} />} />
          <Route path="/add" element={<CreateGame />} />
          <Route path="/sync" element={<SyncGames />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}