import './App.css'
import { Outlet, RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar';
import { router } from './router/Routes';

function App() {


  return (
    <>
        <NavBar />
        <Outlet />
    </>
  )
}

export default App
