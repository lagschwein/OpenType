import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { store, StoreContext } from './stores/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <StoreContext.Provider value={store}>
        <main className="catppuccin-latte text-foreground bg-background">
          <RouterProvider router={router}/>
        </main>
      </StoreContext.Provider>
    </NextUIProvider>
  </React.StrictMode>
)
