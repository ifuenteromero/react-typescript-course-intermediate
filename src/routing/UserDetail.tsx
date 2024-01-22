import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const UserDetail = () => {
	const { id } = useParams();

	const [searchParams, setSearchParams] = useSearchParams();
	// setSearchParams has side effect. Use it only in event handlers or effects
	const name = searchParams.get('name');
	const age = searchParams.get('age');

	const location = useLocation();
	console.log({ location });

	return (
		<p>
			User {id} {name} {age}
			{location.toString()}
		</p>
	);
};

export default UserDetail;
