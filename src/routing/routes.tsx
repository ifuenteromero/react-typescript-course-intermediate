import { createBrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import UserListPage from './UserListPage';

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
	],
	{ basename: baseUrl }
);

export default router;
