import axios, { AxiosRequestConfig } from 'axios';

const apiClient = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
});

export default class APIClient<T> {
	endpoint: string;

	constructor(_endpoint: string) {
		this.endpoint = _endpoint;
	}

	getAll = (params?: AxiosRequestConfig) =>
		apiClient
			.get<T[]>(this.endpoint, { ...params })
			.then((res) => res.data);

	post = (data: T) =>
		apiClient.post<T>(this.endpoint, data).then((res) => res.data);
}
