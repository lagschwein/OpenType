import './App.css'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';

function App() {
  const location = useLocation()

  return (
    <>
      {location.pathname === "/" ? <HomePage /> : 
      <>
        <NavBar />
        <Outlet />
      </>
      }
    </>
  )
}

export default App
