import { createBrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import UserListPage from './UserListPage';
import ContactPage from './ContactPage';
import UserDetailPage from './UserDetailPage';
import Layout from './Layout';

const baseUrl = import.meta.env.BASE_URL;

const root = '/';
const home = '/';
const users = '/users';
const contact = '/contact';
const userDetail = (userId: number | ':id') => `/users/${userId}`;

export const routes = {
	root,
	home,
	users,
	contact,
	userDetail,
};

const relativeRoute = (route: string) =>
	route.substring(routes.root.length, route.length);

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
					element: <UserListPage />,
				},
				{
					path: relativeRoute(routes.contact),
					element: <ContactPage />,
				},
				{
					path: relativeRoute(routes.userDetail(':id')),
					element: <UserDetailPage />,
				},
			],
		},
	],
	{ basename: baseUrl }
);

export default router;
