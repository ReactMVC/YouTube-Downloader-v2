<?php

class DarkTube
{
    private $apiBaseUrl;

    public function __construct()
    {
        $this->apiBaseUrl = "https://api.ytbvideoly.com/api/thirdvideo/parse";
    }

    public function getData($url)
    {
        $apiUrl = $this->API($url);
        $jsonData = $this->sendRequest($apiUrl);

        return json_decode($jsonData, true);
    }

    private function API($url)
    {
        return $this->apiBaseUrl . '?from=videodownloaded&link=' . urlencode($url);
    }

    private function sendRequest($url)
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

        $response = curl_exec($ch);
        curl_close($ch);

        return $response;
    }
}

$data = [];

if (isset($_GET['url']) || !empty($_GET['url'])) {
    $videoUrl = $_GET['url'];
    $videoDownloader = new DarkTube();
    $videoData = $videoDownloader->getData($videoUrl);

    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    echo json_encode($videoData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
} else {
    $data = [
        'status' => false,
        'message' => "Please provide a URL parameter."
    ];
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    http_response_code(400);
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}