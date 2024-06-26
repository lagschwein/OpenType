import './App.css'
import { Outlet, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage';

function App() {
  const location = useLocation()

  return (
    <>
      {location.pathname === "/" ? <HomePage /> : 
      <Outlet />
      }
    </>
  )
}

export default App
