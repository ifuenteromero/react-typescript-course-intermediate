import { useMutation, useQueryClient } from '@tanstack/react-query';
import endpoints from '../../services/endpoints';
import { Todo } from './useTodos';
import { CACHE_KEY_TODOS } from '../constants';
import APIClient from '../../services/api-client';

interface AddTodoContext {
	previousTodos: Todo[];
}

const apiClient = new APIClient<Todo>(endpoints.todos);

const useAddTodo = (onAdd: () => void) => {
	const postToDo = apiClient.post;
	const queryClient = useQueryClient(); // no se puede poner dentro del onSuccess

	return useMutation<Todo, Error, Todo, AddTodoContext>({
		onMutate: (newTodo) => {
			const previousTodos =
				queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];

			queryClient.setQueriesData<Todo[]>(
				CACHE_KEY_TODOS,
				(todos = []) => [newTodo, ...todos]
			);
			return { previousTodos };
		},
		mutationFn: postToDo,
		onSuccess: (savedTodo) => {
			// APPROACH 1. Not valid with jsonplaceholder pq no guarda datos
			// Invalidating the cache
			// queryClient.invalidateQueries({ queryKey: CACHE_KEY_TODOS });
			// APPROACH 2
			queryClient.setQueriesData<Todo[]>(CACHE_KEY_TODOS, (todos = []) =>
				todos.map((todo) =>
					todo.title === savedTodo.title ? savedTodo : todo
				)
			);
		},
		onError(_error, _variables, context) {
			if (!context) return;
			const { previousTodos } = context;

			queryClient.setQueriesData<Todo[]>(CACHE_KEY_TODOS, previousTodos);
		},
		onSettled: () => {
			onAdd();
		},
		retry: 3,
	});
};

export default useAddTodo;
