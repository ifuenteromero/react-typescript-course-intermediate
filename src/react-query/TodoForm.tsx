import { useRef } from 'react';
import useAddTodo from './hooks/useAddTodo';

const TodoForm = () => {
	const ref = useRef<HTMLInputElement>(null);

	const onAddTodo = () => {
		if (ref.current?.value) ref.current.value = '';
	};

	const addTodo = useAddTodo(onAddTodo);

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
