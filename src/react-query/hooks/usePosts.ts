import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/api-client';
import endpoints from '../../services/endpoints';

interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

const usePosts = (userId: number | undefined) => {
	const fetchPosts = () =>
		apiClient
			.get<Post[]>(endpoints.posts, {
				params: {
					userId,
				},
			})
			.then((res) => res.data);

	const { data, error, isLoading } = useQuery<Post[], Error>({
		queryKey: userId ? ['user', userId, 'posts'] : ['posts'],
		queryFn: fetchPosts,
	});

	return { data, error, isLoading };
};

export default usePosts;
