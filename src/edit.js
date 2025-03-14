import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import "./editor.scss";

export default function Edit() {
	const regenerateBlogs = () => {
		console.log("Regenerating blogs...");
		const apiUrl = "/wp-json/n8finch-rest-api/v1/all-the-posts";

		fetch(apiUrl, {
			method: "GET", // Adjust the method based on what your endpoint expects
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
				alert("JSON Regeneration Complete!");
			})
			.catch((error) => {
				console.error("Error:", error);
				alert("Error occurred while regenerating JSON.");
			});
	};

	return (
		<>
			<div {...useBlockProps()}>
				<p>
					{__(
						"Nothing special, the blog block will render here.",
						"n8finch-blog-filter",
					)}
				</p>
				<Button variant="primary" onClick={regenerateBlogs}>
					Regenerate blogs
				</Button>
			</div>
		</>
	);
}
