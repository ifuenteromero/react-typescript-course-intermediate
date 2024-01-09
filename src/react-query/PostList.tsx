import { useState } from 'react';
import usePosts, { PostQuery } from './hooks/usePosts';

const PostList = () => {
	const [query, setQuery] = useState<PostQuery>({
		page: 1,
	} as PostQuery);

	const { page } = query;

	const { data: posts, error, isLoading } = usePosts(query);

	if (isLoading) return <p>Loading...</p>;

	if (error) return <p>{error.message}</p>;

	const handlePreviousPage = () =>
		setQuery({
			...query,
			page: page - 1,
		});

	const handleNextPage = () =>
		setQuery({
			...query,
			page: page + 1,
		});

	const pageText = `Page ${page}`;

	return (
		<>
			<ul className='list-group'>
				{posts?.map((post) => (
					<li key={post.id} className='list-group-item'>
						{post.title}
					</li>
				))}
			</ul>
			<div className='d-flex mt-1 gap-1 align-items-center'>
				<button
					disabled={page === 1}
					className='btn btn-primary'
					onClick={handlePreviousPage}
				>
					Previous
				</button>
				<button className='btn btn-primary' onClick={handleNextPage}>
					Next
				</button>
				<p className='mb-0'>{pageText}</p>
			</div>
		</>
	);
};

export default PostList;
