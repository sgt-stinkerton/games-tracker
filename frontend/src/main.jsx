import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import {ThemeProvider} from './ThemeProvider.jsx'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
