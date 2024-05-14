import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";

export default function Edit() {
	return (
		<p {...useBlockProps()}>
			{__(
				"Nothing special, the blog block will render here.",
				"n8finch-blog-filter",
			)}
		</p>
	);
}
