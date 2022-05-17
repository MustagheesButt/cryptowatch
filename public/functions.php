<?php

function add_cors_http_header()
{
  $allowed_origins = ['http://localhost:3000'];
  if (in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
  }
}
add_action('init', 'add_cors_http_header');

function cw_login(WP_REST_Request $request)
{
  $wallet_address = $request->get_param('wallet_address');

  global $wpdb;
  $tbl_usermeta = $wpdb->prefix . 'usermeta';
  $user_id = $wpdb->get_var($wpdb->prepare("SELECT user_id FROM $tbl_usermeta WHERE meta_key=%s AND meta_value=%s", 'wallet_address', $wallet_address));

  $user = get_user_by('ID', $user_id);

  if (!$user)
  {
    return [ "error" => "Could not find user by " . $wallet_address ];
  }

  wp_clear_auth_cookie();
  wp_set_current_user($user->ID);
  wp_set_auth_cookie($user->ID);
  return [ "success" => true ];
}

add_action('rest_api_init', function () {
  register_rest_route('cw', 'login', [
    'methods' => 'POST',
    'callback' => 'cw_login'
  ]);
});

// Post revisions are limited to 5 in wp-config