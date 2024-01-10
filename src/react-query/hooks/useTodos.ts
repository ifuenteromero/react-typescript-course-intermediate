import { useQuery } from '@tanstack/react-query';
import endpoints from '../../services/endpoints';
import { CACHE_KEY_TODOS } from '../constants';
import APIClient from '../../services/api-client';

export interface Todo {
	id: number;
	title: string;
	userId: number;
	completed: boolean;
}

const apiClient = new APIClient<Todo>(endpoints.todos);

const useTodos = () => {
	const fetchTodos = apiClient.getAll;

	const { data, error, isLoading } = useQuery<Todo[], Error>({
		queryKey: CACHE_KEY_TODOS,
		queryFn: fetchTodos,
		staleTime: 10_000,
		refetchOnWindowFocus: false,
	});

	return { data, error, isLoading };
};

export default useTodos;
