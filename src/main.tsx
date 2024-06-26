import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store, StoreContext } from './stores/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
        <RouterProvider router={router}/>
    </StoreContext.Provider>
  </React.StrictMode>
)
