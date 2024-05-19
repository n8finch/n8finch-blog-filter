import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom";

const PostItem = ({ post }) => {
	return (
		<li className="postItem-wrapper">
			<div className="image-wrapper">
				<a href={post.uri}>
					{post.featuredImage && (
						<img src={post.featuredImage} alt={post.title} />
					)}
				</a>
			</div>
			<div className="content-wrapper">
				<a href={post.uri}>
					<h2>{post.title}</h2>
				</a>
				<small>
					<em>
						Published:{" "}
						{new Date(post.date).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}{" "}
						| Categories:{" "}
						{post.categories.nodes.map((category, index) => {
							return (
								<a key={category.id} href={category.uri}>
									{category.name}
									{index < post.categories.nodes.length - 1 && ", "}
								</a>
							);
						})}
					</em>
				</small>
				<p
					dangerouslySetInnerHTML={{
						__html: post.excerpt.slice(0, 100) + "...",
					}}
				></p>
			</div>
		</li>
	);
};

const PostList = ({ posts }) => {
	return (
		<ul>
			{posts.map((post) => (
				<PostItem key={post.id} post={post} />
			))}
		</ul>
	);
};

const SearchForm = ({ search, setSearch }) => {
	return (
		<form>
			{/* <label htmlFor="search">Search:</label> */}
			<input
				type="text"
				id="search"
				placeholder="Search posts..."
				value={search}
				onChange={(event) => setSearch(event.target.value)}
			/>
		</form>
	);
};

// const allPostsEndpoint = "/wp-json/n8finch-rest-api/v1/all-the-posts";
const allPostsEndpoint = "/wp-content/uploads/all-the-posts.json";

const requestOptions = {
	method: "GET",
	headers: { "Content-Type": "application/json" },
};

function BlogFilterApp() {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(allPostsEndpoint, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				const fetchedPosts = data.data.posts.nodes;
				const posts = fetchedPosts.map((post) => {
					return {
						id: post.id,
						title: post.title,
						excerpt: post.excerpt,
						date: post.date,
						uri: post.uri,
						categories: post.categories ?? { nodes: [] },
						featuredImage: post.featuredImage
							? post.featuredImage.node.sourceUrl.replace(
									"https://n8finch2024.local//Users/natefinch/Local Sites/n8finch2024/app/public",
									"",
							  )
							: null,
					};
				});

				setPosts(posts);
				setLoading(false);
			})
			.catch((error) => console.error("Error fetching posts:", error));
	}, []);

	return (
		<div>
			<SearchForm search={search} setSearch={setSearch} />
			{loading && (
				<p>
					<em>Loading posts...</em>
				</p>
			)}
			<PostList
				posts={posts.filter(
					(post) =>
						// if the post title or categories include the search term
						post.title.toLowerCase().includes(search.toLowerCase()) ||
						post.categories.nodes.some((category) =>
							category.name.toLowerCase().includes(search.toLowerCase()),
						),
				)}
			/>
		</div>
	);
}

const root = createRoot(document.getElementById("n8finch-blog-filter"));
window.addEventListener(
	"load",
	function () {
		root.render(<BlogFilterApp />);
	},
	false,
);
