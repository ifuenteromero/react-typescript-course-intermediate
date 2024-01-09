import { Fragment } from 'react';
import usePosts from './hooks/usePosts';

const PostList = () => {
	const query = {
		pageSize: 10,
	};

	const {
		data,
		error,
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = usePosts(query);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;

	const buttonText = isFetchingNextPage ? 'Loading...' : 'Load More';

	return (
		<>
			<ul className='list-group'>
				{data.pages.map((page, index) => (
					<Fragment key={index}>
						{page.map((post) => (
							<li key={post.id} className='list-group-item'>
								{post.title}
							</li>
						))}
					</Fragment>
				))}
			</ul>
			{hasNextPage && (
				<button
					className='btn btn-primary'
					onClick={() => fetchNextPage()}
					disabled={isFetchingNextPage}
				>
					{buttonText}
				</button>
			)}
		</>
	);
};

export default PostList;
