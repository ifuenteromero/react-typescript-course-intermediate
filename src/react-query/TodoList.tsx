import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import endpoints from '../services/endpoints';

interface Todo {
	id: number;
	title: string;
	userId: number;
	completed: boolean;
}

const TodoList = () => {
	const fetchTodos = () =>
		apiClient.get<Todo[]>(endpoints.todos).then((res) => res.data);

	const {
		data: todos,
		error,
		isLoading,
	} = useQuery<Todo[], Error>({
		queryKey: ['todos'],
		queryFn: fetchTodos,
	});

	if (isLoading) return <p>Loading...</p>;

	if (error) return <p>{error.message}</p>;

	return (
		<ul className='list-group'>
			{todos?.map((todo) => (
				<li key={todo.id} className='list-group-item'>
					{todo.title}
				</li>
			))}
		</ul>
	);
};

export default TodoList;
