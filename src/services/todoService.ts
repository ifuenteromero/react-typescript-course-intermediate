import APIClient from './api-client';
import endpoints from './endpoints';

export interface Todo {
	id: number;
	title: string;
	userId: number;
	completed: boolean;
}

export default new APIClient<Todo>(endpoints.todos);
