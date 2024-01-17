import { createBrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import UserListPage from './UserListPage';
import ContactPage from './ContactPage';
import UserDetailPage from './UserDetailPage';
import Layout from './Layout';

const baseUrl = import.meta.env.BASE_URL;

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					path: '/',
					element: <HomePage />,
				},
				{
					path: '/users',
					element: <UserListPage />,
				},
				{
					path: '/contact',
					element: <ContactPage />,
				},
				{
					path: '/users/:id',
					element: <UserDetailPage />,
				},
			],
		},
	],
	{ basename: baseUrl }
);

export default router;
