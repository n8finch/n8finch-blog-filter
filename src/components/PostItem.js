export default PostItem = ({ post }) => {
	return (
		<li>
			<h2>{post.title}</h2>
			<p>{post.excerpt}</p>
			{post.featuredImage && <img src={post.featuredImage} alt={post.title} />}
		</li>
	);
};
