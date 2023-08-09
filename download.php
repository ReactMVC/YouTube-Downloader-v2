<?php

class FileDownloader
{
    public function download(string $url, string $filename, string $header): void
    {
        $size = $this->getRemoteFileSize($url);

        header('Content-Description: File Transfer');
        header('Content-Type: ' . $header);
        header("Content-Transfer-Encoding: Binary");
        header("Content-Length: $size");
        header('Content-Disposition: attachment; filename="' . $filename . '"');

        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        echo $resp = curl_exec($curl);
        curl_close($curl);
    }

    private function getRemoteFileSize($url): int
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, TRUE);
        curl_setopt($ch, CURLOPT_NOBODY, TRUE);
        $data = curl_exec($ch);
        $fileSize = curl_getinfo($ch, CURLINFO_CONTENT_LENGTH_DOWNLOAD);
        $httpResponseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return intval($fileSize);
    }
}

if (isset($_GET['url'])) {
    $url = $_GET['url'];
    $filename = randomName();
    $downloader = new FileDownloader();
    $downloader->download($url, $filename, "video/mp4");
} else {
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