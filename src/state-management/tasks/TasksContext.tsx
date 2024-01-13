import {
	Dispatch,
	ReactNode,
	createContext,
	useContext,
	useReducer,
} from 'react';

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

export type TaskAction = AddTask | DeleteTask;

const tasksReducer = (tasks: Task[], action: TaskAction): Task[] => {
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

interface Props {
	children: ReactNode;
}

export const TasksProvider = ({ children }: Props) => {
	const [tasks, dispatch] = useReducer(tasksReducer, []);
	return (
		<TasksContext.Provider value={{ tasks, dispatch }}>
			{children}
		</TasksContext.Provider>
	);
};

interface TaskContextType {
	tasks: Task[];
	dispatch: Dispatch<TaskAction>;
}

const TasksContext = createContext<TaskContextType>({} as TaskContextType);
TasksContext.displayName = 'TasksContext';

export const useTasks = () => useContext(TasksContext);
