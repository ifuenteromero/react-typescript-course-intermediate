import { useState } from 'react';
import usePosts, { PostQueryOptions } from './hooks/usePosts';

const PostList = () => {
	const [postQueryOptions, setPostQueryOptions] = useState<PostQueryOptions>({
		page: 1,
	} as PostQueryOptions);

	const { page, userId } = postQueryOptions;

	const { data: posts, error, isLoading } = usePosts(postQueryOptions);

	if (isLoading) return <p>Loading...</p>;

	if (error) return <p>{error.message}</p>;

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
		setPostQueryOptions({
			userId: parseInt(e.target.value) || undefined,
			page: 1,
		});

	const handlePreviousPage = () =>
		setPostQueryOptions({
			...postQueryOptions,
			page: page - 1,
		});

	const handleNextPage = () =>
		setPostQueryOptions({
			...postQueryOptions,
			page: page + 1,
		});

	const userText = userId ? `User ${userId}` : 'All users';
	const pageText = `Page ${page}`;

	return (
		<>
			<select
				onChange={handleChange}
				value={userId}
				className='form-select mb-3'
			>
				<option value=''></option>
				<option value='1'>User 1</option>
				<option value='2'>User 2</option>
				<option value='3'>User 3</option>
			</select>
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
				<p className='mb-0'>
					{userText} - {pageText}
				</p>
			</div>
		</>
	);
};

export default PostList;
