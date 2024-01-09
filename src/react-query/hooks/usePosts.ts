import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/api-client';
import endpoints from '../../services/endpoints';

interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

export interface PostQueryOptions {
	userId: number | undefined;
	page: number;
}

interface PostQuery extends PostQueryOptions {
	pageSize?: number;
}

const usePosts = (query: PostQuery) => {
	const { page, userId, pageSize = 10 } = query;
	const fetchPosts = () =>
		apiClient
			.get<Post[]>(endpoints.posts, {
				params: {
					_start: (page - 1) * pageSize,
					_limit: pageSize,
				},
			})
			.then((res) => res.data);

	const { data, error, isLoading } = useQuery<Post[], Error>({
		queryKey: ['user', userId || 'All', 'page', page],
		queryFn: fetchPosts,
		refetchOnWindowFocus: false,
		keepPreviousData: true,
	});

	return { data, error, isLoading };
};

export default usePosts;
