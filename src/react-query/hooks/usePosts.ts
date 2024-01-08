import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/api-client';
import endpoints from '../../services/endpoints';

interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

const usePosts = () => {
	const fetchPosts = () =>
		apiClient.get<Post[]>(endpoints.posts).then((res) => res.data);

	const { data, error, isLoading } = useQuery<Post[], Error>({
		queryKey: ['posts'],
		queryFn: fetchPosts,
	});

	return { data, error, isLoading };
};

export default usePosts;
