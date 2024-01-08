import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/api-client';
import endpoints from '../../services/endpoints';

interface Todo {
	id: number;
	title: string;
	userId: number;
	completed: boolean;
}

const useTodos = () => {
	const fetchTodos = () =>
		apiClient.get<Todo[]>(endpoints.todos).then((res) => res.data);

	const { data, error, isLoading } = useQuery<Todo[], Error>({
		queryKey: ['todos'],
		queryFn: fetchTodos,
		staleTime: 10_000,
	});

	return { data, error, isLoading };
};

export default useTodos;
