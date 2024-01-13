import './App.css';
import { AuthProvider } from './state-management/auth/AuthContext';
import Counter from './state-management/counter/Counter';
import HomePage from './state-management/HomePage';
import NavBar from './state-management/NavBar';
import { TasksProvider } from './state-management/tasks/TasksContext';

function App() {
	return (
		<AuthProvider>
			<TasksProvider>
				<Counter />
				<NavBar />
				<HomePage />
			</TasksProvider>
		</AuthProvider>
	);
}

export default App;
