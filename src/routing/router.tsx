import { createBrowserRouter } from 'react-router-dom';
import ContactPage from './ContactPage';
import HomePage from './HomePage';
import Layout from './Layout';
import UserDetail from './UserDetail';
import UsersPage from './UsersPage';
import { routes } from './routes';

const relativeRoute = (route: string, relativeRoute: string = routes.root) =>
	route.substring(relativeRoute.length, route.length);

const router = createBrowserRouter(
	[
		{
			path: routes.root,
			element: <Layout />,
			children: [
				{
					path: relativeRoute(routes.home),
					element: <HomePage />,
				},
				{
					path: relativeRoute(routes.users),
					element: <UsersPage />,
					children: [
						{
							path: relativeRoute(
								routes.userDetail(':id'),
								`${routes.users}/`
							),
							element: <UserDetail />,
						},
					],
				},
				{
					path: relativeRoute(routes.contact),
					element: <ContactPage />,
				},
			],
		},
	],
	{ basename: routes.baseUrl }
);

export default router;
