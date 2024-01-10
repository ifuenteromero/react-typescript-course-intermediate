import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import apiClient from '../services/api-client';
import endpoints from '../services/endpoints';
import { Todo } from './hooks/useTodos';

interface AddTodoContext {
	previousTodos: Todo[];
}

const TodoForm = () => {
	const ref = useRef<HTMLInputElement>(null);
	const postToDo = (newTodo: Todo) =>
		apiClient.post<Todo>(endpoints.todos, newTodo).then((res) => res.data);
	const queryClient = useQueryClient(); // no se puede poner dentro del onSuccess

	const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
		onMutate: (newTodo) => {
			const previousTodos =
				queryClient.getQueryData<Todo[]>(['todos']) || [];

			queryClient.setQueriesData<Todo[]>(['todos'], (todos = []) => [
				newTodo,
				...todos,
			]);
			return { previousTodos };
		},
		mutationFn: postToDo,
		onSuccess: (savedTodo) => {
			// APPROACH 1. Not valid with jsonplaceholder pq no guarda datos
			// Invalidating the cache
			// queryClient.invalidateQueries({ queryKey: ['todos'] });
			// APPROACH 2
			queryClient.setQueriesData<Todo[]>(['todos'], (todos = []) =>
				todos.map((todo) =>
					todo.title === savedTodo.title ? savedTodo : todo
				)
			);
		},
		onError(_error, _variables, context) {
			if (!context) return;
			const { previousTodos } = context;

			queryClient.setQueriesData<Todo[]>(['todos'], previousTodos);
		},
		onSettled: () => {
			if (ref.current?.value) ref.current.value = '';
		},
		retry: 3,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isButtonEnabled = !!ref?.current?.value;
		if (isButtonEnabled)
			addTodo.mutate({
				id: 0,
				title: ref.current.value,
				completed: false,
				userId: 1,
			});
	};

	return (
		<>
			{addTodo.error && (
				<div className='alert alert-danger'>
					{addTodo.error?.message}
				</div>
			)}
			<form className='row mb-3' onSubmit={handleSubmit}>
				<div className='col'>
					<input
						readOnly={addTodo.isLoading}
						ref={ref}
						type='text'
						className='form-control'
					/>
				</div>
				<div className='col'>
					<button
						disabled={addTodo.isLoading}
						className='btn btn-primary'
					>
						{addTodo.isLoading ? 'Adding...' : 'Add'}
					</button>
				</div>
			</form>
		</>
	);
};

export default TodoForm;
