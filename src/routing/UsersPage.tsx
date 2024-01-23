import { Navigate, Outlet } from 'react-router-dom';
import UserList from './UserList';
import useAuth from './hooks/useAuth';
import { routes } from './routes';

const UsersPage = () => {
	// para restringir rutas
	// Por ejemplo queremos enseñar esta página sólo para usuarios autenticados
	const { user } = useAuth();
	if (!user) return <Navigate to={routes.login} />;
	// no podemos usar useNavigate porque tiene sideEffects. It updates the url in the browser
	// no se la puede llamar during the render phase, because otherwise this component will no longer be
	// a pure function. Solo la podemos usar o en event handlers o en effects. Pero aquí no ponemos un
	// efecto pq se ejecuta después del rendery no queremos renderizar la página y después redirigir al login

	return (
		<div className='row'>
			<div className='col'>
				<UserList />
			</div>
			<div className='col'>
				<Outlet />
			</div>
		</div>
	);
};

export default UsersPage;
