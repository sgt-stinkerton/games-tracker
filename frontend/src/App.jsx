import {useState} from 'react';
import {Route, Routes} from 'react-router-dom';

import Home from './views/Home.jsx';
import Games from './views/Games.jsx';
import AddGame from './views/AddGame.jsx';
import Reviews from './views/Reviews.jsx';
import Profile from './views/Profile.jsx';
import SideBar from './components/SideBar.jsx';
import ToastComponent from "./components/ToastComponent.jsx";

// TODO light mode / dark mode in user table

export default function App() {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  return (
    <div className="d-flex p-0">
      <ToastComponent show={showToast} onClose={() => setShowToast(false)} message={toastMsg} />
      <SideBar />
      <main
        className="p-4 bg-light"
        style={{ marginLeft: '220px', minHeight: '100vh', width: 'calc(100vw - 220px)' }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/add" element={<AddGame setShowToast={setShowToast} setToastMsg={setToastMsg} />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}