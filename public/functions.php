<?php

function add_cors_http_header()
{
  $allowed_origins = ['http://localhost:3000'];
  if (in_array($_SERVER[ 'HTTP_ORIGIN' ], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER[ 'HTTP_ORIGIN' ]);
  }
}
add_action('init', 'add_cors_http_header');

// Post revisions are limited to 5 in wp-config