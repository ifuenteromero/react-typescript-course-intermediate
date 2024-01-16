import { Link, useSearchParams } from 'react-router-dom';

const UserListPage = () => {
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
					<Link to={`/users/${user.id}`}>{user.name}</Link>
					<Link
						to={`/users/${user.id}?name=${user.name}&age=${user.age}`}
					>
						{user.name} Params
					</Link>
				</li>
			))}
		</ul>
	);
};

export default UserListPage;
