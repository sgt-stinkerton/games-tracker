import { Route, Routes } from 'react-router-dom';
// imports for main page sections (sidebar, dashboard, library)
import Dashboard from './views/Dashboard.jsx';
import './App.css'

export default function App() {

  return (
    <div className="app-container" style={{ display: 'flex' }}>
      {/*<Sidebar />*/}

      <main style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/*<Route path="/library" element={<Library />} />*/}
        </Routes>
      </main>
    </div>
  )
}