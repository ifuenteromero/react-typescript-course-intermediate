import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/api-client';
import endpoints from '../../services/endpoints';

interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

export interface PostQuery {
	pageSize?: number;
	page: number;
}

const usePosts = (query: PostQuery) => {
	const { page, pageSize = 10 } = query;
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
		queryKey: ['posts', 'page', page],
		queryFn: fetchPosts,
		refetchOnWindowFocus: false,
		keepPreviousData: true,
		staleTime: 10_000, // 10s
	});

	return { data, error, isLoading };
};

export default usePosts;
