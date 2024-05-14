import PostItem from './PostItem';

export default PostList = ({ posts }) => {
	return (
		<ul>
			{posts.map((post) => (
				<PostItem key={post.id} post={post} />
			))}
		</ul>
	);
}
