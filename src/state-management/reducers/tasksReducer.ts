export interface Task {
	id: number;
	title: string;
}

interface AddTask {
	type: 'ADD';
	task: Task;
}

interface DeleteTask {
	type: 'DELETE';
	taskId: number;
}

type Action = AddTask | DeleteTask;

const tasksReducer = (tasks: Task[], action: Action): Task[] => {
	const { type } = action;
	switch (type) {
		case 'ADD':
			return [action.task, ...tasks];
		case 'DELETE':
			return tasks.filter((task) => task.id !== action.taskId);
		default:
			return tasks;
	}
};

export default tasksReducer;