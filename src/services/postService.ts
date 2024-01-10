import APIClient from './api-client';
import endpoints from './endpoints';

export interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

export default new APIClient<Post>(endpoints.posts);
