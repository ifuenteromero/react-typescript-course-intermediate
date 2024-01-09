import { useInfiniteQuery } from '@tanstack/react-query';
import apiClient from '../../services/api-client';
import endpoints from '../../services/endpoints';

interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}
interface PostQuery {
	pageSize?: number;
}

const usePosts = (query: PostQuery) => {
	const { pageSize = 10 } = query;

	const fetchPosts = ({ pageParam = 1 }) =>
		apiClient
			.get<Post[]>(endpoints.posts, {
				params: {
					_start: (pageParam - 1) * pageSize,
					_limit: pageSize,
				},
			})
			.then((res) => res.data);

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
