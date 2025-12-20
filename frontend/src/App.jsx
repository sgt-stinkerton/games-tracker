import {Route, Routes} from 'react-router-dom';
import Home from './views/Home.jsx';
import Games from './views/Games.jsx';
import Reviews from './views/Reviews.jsx';
import Profile from './views/Profile.jsx';
import SideBar from './components/SideBar.jsx';

// TODO light mode / dark mode in user table

export default function App() {

  return (
    <div className="d-flex p-0">
      <SideBar />
      <main
        className="p-4 bg-light"
        style={{ marginLeft: '220px', minHeight: '100vh', width: 'calc(100vw - 220px)' }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}