import './App.css'
import { RouterProvider } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react';
import NavBar from './components/NavBar';
import { router } from './router/Routes';

function App() {

  return (
    <NextUIProvider >
      <main className="dark text-foreground bg-background">
        <NavBar />
        <RouterProvider router={router} />
      </main>
    </NextUIProvider>
  )
}

export default App
