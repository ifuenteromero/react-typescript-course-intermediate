import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/api-client';
import endpoints from '../../services/endpoints';
import { CACHE_KEY_TODOS } from '../constants';

export interface Todo {
	id: number;
	title: string;
	userId: number;
	completed: boolean;
}

const useTodos = () => {
	const fetchTodos = () =>
		apiClient.get<Todo[]>(endpoints.todos).then((res) => res.data);

	const { data, error, isLoading } = useQuery<Todo[], Error>({
		queryKey: CACHE_KEY_TODOS,
		queryFn: fetchTodos,
		staleTime: 10_000,
		refetchOnWindowFocus: false,
	});

	return { data, error, isLoading };
};

export default useTodos;
