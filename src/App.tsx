import './App.css'
import { RouterProvider } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react';
import NavBar from './components/NavBar';
import { router } from './router/Routes';

function App() {

  return (
    <>
      <NavBar />
      <RouterProvider router={router} />
    </>
  )
}

export default App
