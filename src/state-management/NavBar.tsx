import LoginStatus from './auth/LoginStatus';
import { useTasks } from './tasks/TasksContext';

const NavBar = () => {
	const { tasks } = useTasks();
	return (
		<nav className='navbar d-flex justify-content-between'>
			<span className='badge text-bg-secondary'>{tasks.length}</span>
			<LoginStatus />
		</nav>
	);
};

export default NavBar;
