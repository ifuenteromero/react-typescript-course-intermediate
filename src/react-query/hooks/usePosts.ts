import { useInfiniteQuery } from '@tanstack/react-query';
import postService, { Post } from '../../services/postService';

interface PostQuery {
	pageSize?: number;
}

const usePosts = (query: PostQuery) => {
	const { pageSize = 10 } = query;

	const fetchPosts = ({ pageParam = 1 }) =>
		postService.getAll({
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
