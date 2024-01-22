import NavLink from './NavLink';
import { routes } from './routes';

const NavBar = () => {
	return (
		<nav
			className='navbar navbar-expand-lg'
			style={{ background: '#f0f0f0', marginBottom: '1rem' }}
		>
			<div className='container-fluid'>
				<a className='navbar-brand' href='#'>
					My App
				</a>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<NavLink to={routes.home}>Home</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink to={routes.users}>Users</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
