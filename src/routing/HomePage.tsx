import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<>
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit.
				Incidunt, mollitia!
			</p>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Link to='/users'>Users</Link>
				<Link to='/contact'>contact</Link>
			</div>
		</>
	);
};

export default HomePage;
