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

const graphqlEndpoint = "https://n8finch2024.local/graphql";
const query = `
{
  posts(first: 500) {
    nodes {
      id
      title
      excerpt
      date
      uri
      featuredImage {
        node {
          sourceUrl(size: MEDIUM)
        }
      }
    }
  }
}
`;

const requestOptions = {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({ query }),
};

function BlogFilterApp() {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log("Hello from JavaScript!");
		fetch(graphqlEndpoint, requestOptions)
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
						featuredImage: post.featuredImage
							? post.featuredImage.node.sourceUrl
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
			{loading && <p><em>Loading posts...</em></p>}
			<PostList
				posts={posts.filter((post) =>
					post.title.toLowerCase().includes(search.toLowerCase()),
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
