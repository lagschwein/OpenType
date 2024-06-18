import { RouteObject, createBrowserRouter } from "react-router-dom"
import Main from "../pages/Main"

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <Main />,
    children: [
    ]
	}
]

export const router = createBrowserRouter(routes)