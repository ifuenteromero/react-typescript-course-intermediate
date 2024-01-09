import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import apiClient from '../services/api-client';
import endpoints from '../services/endpoints';
import { Todo } from './hooks/useTodos';

const TodoForm = () => {
	const ref = useRef<HTMLInputElement>(null);
	const postToDo = (newTodo: Todo) =>
		apiClient.post<Todo>('/xtodos', newTodo).then((res) => res.data);
	const queryClient = useQueryClient(); // no se puede poner dentro del onSuccess

	const addTodo = useMutation<Todo, Error, Todo>({
		mutationFn: postToDo,
		onSuccess: (savedTodo) => {
			// APPROACH 1. Not valid with jsonplaceholder pq no guarda datos
			// Invalidating the cache
			// queryClient.invalidateQueries({ queryKey: ['todos'] });
			// APPROACH 2
			queryClient.setQueriesData<Todo[]>(['todos'], (todos = []) => [
				savedTodo,
				...todos,
			]);
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
