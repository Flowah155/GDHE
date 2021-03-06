<?php

use Medoo\Medoo;

function db_connect()
{
    $config = json_decode(
        file_get_contents(__DIR__ . '/../../config/db_config.json')
    );
    return new Medoo(array(
        'database_type' => $config->db_type,
        'database_name' => $config->db_name,
        'server' => $config->server,
        'username' => $config->username,
        'password' => $config->password
    ));
}
