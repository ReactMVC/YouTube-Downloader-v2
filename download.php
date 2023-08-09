<?php

if (isset($_GET['url'])) {
    $url = $_GET['url'];
    $filename = randomName();
    header('Content-Type: video/mp4');
    header('Content-Disposition: attachment; filename=' . $filename);
    readfile($url);
    exit;
}else{
    echo "Welcome :)";
}

function randomName($length = 10)
{
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $randomName = '';
    for ($i = 0; $i < $length; $i++) {
        $randomName .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomName;
}