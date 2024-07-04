import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store, StoreContext } from './stores/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Routes'

// const registerServiceWorker = async () => {
//   if ("serviceWorker" in navigator) {
//     try {
//       const registration = await navigator.serviceWorker.register(
//         new URL('./util/sw.ts', import.meta.url),
//         { type: "module"}
//       );
//       if (registration.installing)
//       {
//         console.log("Service worker isntalling")
//       } else if(registration.waiting)
//       {
//         console.log("Service worker waiting")
//       } else if(registration.active)
//       {
//         console.log("Service worker active")
//       } 
//     } catch (error) {
//       console.error("Service worker registration failed", error)
//     }
//   }
// }

// registerServiceWorker()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
        <RouterProvider router={router}/>
    </StoreContext.Provider>
  </React.StrictMode>
)
