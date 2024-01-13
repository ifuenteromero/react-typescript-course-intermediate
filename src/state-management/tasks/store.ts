import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

export interface Task {
	id: number;
	title: string;
}

interface TasksStore {
	tasks: Task[];
	addTask: (task: Task) => void;
	deleteTask: (taskId: number) => void;
}

const useTasksStore = create<TasksStore>((set) => ({
	tasks: [],
	addTask: (newTask) =>
		set((store) => ({ tasks: [newTask, ...store.tasks] })),
	deleteTask: (taskId) =>
		set((store) => ({
			tasks: store.tasks.filter((task) => task.id !== taskId),
		})),
}));

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('Tasks Store', useTasksStore);
}

export default useTasksStore;
