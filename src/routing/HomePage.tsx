import { Link } from 'react-router-dom';
import { routes } from './routes';

const HomePage = () => {
	return (
		<>
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit.
				Incidunt, mollitia!
			</p>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Link to={routes.users}>Users</Link>
				<Link to={routes.contact}>contact</Link>
			</div>
		</>
	);
};

export default HomePage;
