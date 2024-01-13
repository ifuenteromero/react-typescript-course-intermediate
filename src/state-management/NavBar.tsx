import LoginStatus from './auth/LoginStatus';
import useCounterStore from './counter/store';
import { useTasks } from './tasks/TasksContext';

const NavBar = () => {
	const { tasks } = useTasks();
	const { value } = useCounterStore();
	return (
		<nav className='navbar d-flex justify-content-between'>
			<span className='badge text-bg-secondary'>{value}</span>
			<span className='badge text-bg-secondary'>{tasks.length}</span>
			<LoginStatus />
		</nav>
	);
};

export default NavBar;
