import { RouteObject, createBrowserRouter } from "react-router-dom"
import App from "../App"
import Main from "../pages/Main"

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <App />,
    children: [
      {path: 'main', element: <Main />},
    ]
	}
]

export const router = createBrowserRouter(routes)