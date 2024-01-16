import { createBrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import UserListPage from './UserListPage';
import ContactPage from './ContactPage';

const baseUrl = import.meta.env.BASE_URL;

const router = createBrowserRouter(
	[
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
	],
	{ basename: baseUrl }
);

export default router;
