import { Link, Outlet } from 'react-router-dom';
import { routes } from './routes';

const UserList = () => {
	const users = [
		{ id: 1, name: 'Mosh', age: 99 },
		{ id: 2, name: 'John', age: 22 },
		{ id: 3, name: 'Alice', age: 40 },
	];

	return (
		<ul className='list-group'>
			{users.map((user) => (
				<li
					className='list-group-item d-flex justify-content-between'
					key={user.id}
				>
					<Link to={routes.userDetail(user.id)}>{user.name}</Link>
					<Link
						to={`${routes.userDetail(user.id)}?name=${
							user.name
						}&age=${user.age}`}
					>
						{user.name} Params
					</Link>
				</li>
			))}
		</ul>
	);
};

export default UserList;
