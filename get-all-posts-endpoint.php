<?php

class Get_All_Posts_Endpoint
{
    // Define the path to the JSON file.
    public $all_posts_file = '';

    public function __construct()
    {
        $upload_dir = wp_upload_dir();
        $this->all_posts_file = trailingslashit( $upload_dir['basedir'] ) . 'all-the-posts.json';
        // Create a WP REST API endpoint for all the posts.
        add_action('rest_api_init', [ $this, 'create_all_posts_endpoint' ]);
    }

    // Create a WP REST API endpoint for all the posts.
    public function create_all_posts_endpoint()
    {
        register_rest_route(
            'n8finch-rest-api/v1', '/all-the-posts', [
            'methods' => 'GET',
            'callback' => [ $this, 'get_all_the_posts' ],
            'permission_callback' => '__return_true',
            ]
        );
    }

    /**
     * get_all_the_posts
     *
     * @return object
     */
    public function get_all_the_posts()
    {
        // Check if the file exists.
        if (file_exists($this->all_posts_file) ) {
          error_log('FILE is: ' . $this->all_posts_file);

            // Check the file timestamp.
            $file_timestamp = filemtime($this->all_posts_file);
            // Check the current timestamp.
            $current_timestamp = time();
            // Check if the file is older than 10 minutes.
            if ($current_timestamp - $file_timestamp < 10 * MINUTE_IN_SECONDS ) {
                  // If the file is less than 10 minutes old, return the contents of the file.
                  return json_decode(file_get_contents($this->all_posts_file));
            }
        }

        // If the file doesn't exist or is older than 10 minutes, create the file.
        return $this->create_all_posts_file();
    }

    /**
     * create_all_posts_file
     *
     * @return object
     */
    public function create_all_posts_file()
    {
        // Get all the posts.
        $request = wp_remote_post(
            site_url() . '/graphql', [
            'headers' => [
            'Content-Type' => 'application/json',
            ],
            'body' => wp_json_encode(
                [
                'query' => '
			{
				posts(first: 500) {
					nodes {
						id
						title
						excerpt(format: RENDERED)
						date
						uri
						featuredImage {
							node {
								sourceUrl(size: MEDIUM)
							}
						}
						categories{
							nodes{
								id
								name
								uri
							}
						}
					}
				}
			}
		'
                ]
            )
            ]
        );

        file_put_contents( $this->all_posts_file, $request['body']);

        return json_decode($request['body'], true);
    }
}

new Get_All_Posts_Endpoint();
