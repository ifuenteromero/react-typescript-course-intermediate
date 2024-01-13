import LoginStatus from './auth/LoginStatus';
import useCounterStore from './counter/store';
import useTasksStore from './tasks/store';

const NavBar = () => {
	const tasks = useTasksStore((s) => s.tasks);
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
