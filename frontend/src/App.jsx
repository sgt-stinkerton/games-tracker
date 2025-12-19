import {Route, Routes} from 'react-router-dom';
import Dashboard from './views/Dashboard.jsx';
import TopBar from './components/TopBar.jsx';

export default function App() {

  return (
    <div className="p-0">
      <TopBar />

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}