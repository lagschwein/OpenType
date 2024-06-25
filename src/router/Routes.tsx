import { RouteObject, createBrowserRouter } from "react-router-dom"
import Test from "../pages/Test"
import NotSupported from "../pages/errors/NotSupported"
import App from "../App"

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <App />,
    children: [
			{"path": "test", "element": <Test />},
			{"path": "not-supported", "element": <NotSupported />}
    ]
	}
]

export const router = createBrowserRouter(routes)