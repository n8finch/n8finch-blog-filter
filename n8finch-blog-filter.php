<?php
/**
 * Plugin Name:       N8finch Blog Filter
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       n8finch-blog-filter
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function create_block_n8finch_blog_filter_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_n8finch_blog_filter_block_init' );

/*
 * Increase perPage for product categories. This is needed to build out the sidebar accordion.
 */
add_filter( 'graphql_connection_max_query_amount', function ( int $max_amount, $source, array $args, $context, $info ) {
	return 500;
}, 10, 5 );
