import { useInfiniteQuery } from '@tanstack/react-query';
import endpoints from '../../services/endpoints';
import APIClient from '../../services/api-client';

interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}
interface PostQuery {
	pageSize?: number;
}

const apiClient = new APIClient<Post>(endpoints.posts);

const usePosts = (query: PostQuery) => {
	const { pageSize = 10 } = query;

	const fetchPosts = ({ pageParam = 1 }) =>
		apiClient.getAll({
			params: {
				_start: (pageParam - 1) * pageSize,
				_limit: pageSize,
			},
		});

	return useInfiniteQuery<Post[], Error>({
		queryKey: ['posts'],
		queryFn: fetchPosts,
		refetchOnWindowFocus: false,
		keepPreviousData: true,
		staleTime: 10_000, // 10s
		getNextPageParam: (lastResults, allResults) => {
			const page = allResults.length;
			const isLastPage = lastResults.length < pageSize;
			return isLastPage ? undefined : page + 1;
		},
	});
};

export default usePosts;
