<?php

class Get_All_Posts_Endpoint
{
    // Define the path to the JSON file.
    const ALL_THE_POSTS_JSON_FILE = ABSPATH . 'wp-content/uploads/all-the-posts.json';
    public function __construct()
    {
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
        if (file_exists(self::ALL_THE_POSTS_JSON_FILE) ) {
            // Check the file timestamp.
            $file_timestamp = filemtime(self::ALL_THE_POSTS_JSON_FILE);
            // Check the current timestamp.
            $current_timestamp = time();
            // Check if the file is older than 10 minutes.
            if ($current_timestamp - $file_timestamp < 10 * MINUTE_IN_SECONDS ) {
                  // If the file is less than 10 minutes old, return the contents of the file.
                  return json_decode(file_get_contents(self::ALL_THE_POSTS_JSON_FILE));
            }
        }

        // If the file doesn't exist or is older than 10 minutes, create the file.
        return self::create_all_posts_file();
    }

    /**
     * create_all_posts_file
     *
     * @return object
     */
    public static function create_all_posts_file()
    {
        // Get all the posts.
        $request = wp_remote_post(
            'https://n8finch2024.local/graphql', [
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

        // NOTE: the `true` returns the data as an associative
        // array instead of an object
        // $decoded_response = json_decode($request['body'], true);

        // Write the events to the file.
        file_put_contents(self::ALL_THE_POSTS_JSON_FILE, $request['body']);

        return json_decode($request['body'], true);
    }
}

new Get_All_Posts_Endpoint();
