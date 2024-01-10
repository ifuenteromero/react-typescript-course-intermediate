import { useQuery } from '@tanstack/react-query';
import todoService, { Todo } from '../../services/todoService';
import { CACHE_KEY_TODOS } from '../constants';

const useTodos = () => {
	const fetchTodos = todoService.getAll;

	const { data, error, isLoading } = useQuery<Todo[], Error>({
		queryKey: CACHE_KEY_TODOS,
		queryFn: fetchTodos,
		staleTime: 10_000,
		refetchOnWindowFocus: false,
	});

	return { data, error, isLoading };
};

export default useTodos;
