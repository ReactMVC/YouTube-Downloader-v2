/*
Developer: Hossein Pira
Email: h3dev.pira@gmail.com
Telegram: @h3dev
*/

const http = new DarkJS();
const loader = document.querySelector('#loader');
const result = document.querySelector('#result');
const title = document.getElementById("title");
const videos = document.getElementById('videos');
const audios = document.getElementById('audios');
const proxy = document.getElementById('proxy');

const form = document.getElementById("yt-form");

function calculateQuality(videoResolution) {
    let resolution = videoResolution.split("x");
    let width = parseInt(resolution[0]);
    let height = parseInt(resolution[1]);
    if ((width === 1280 && height === 720) || (width === 720 && height === 1280)) {
        return "720p";
    } else if ((width === 1920 && height === 1080) || (width === 1080 && height === 1920)) {
        return "1080p";
    } else if ((width === 2560 && height === 1440) || (width === 1440 && height === 2560)) {
        return "1440p";
    } else if ((width === 3840 && height === 2160) || (width === 2160 && height === 3840)) {
        return "4K";
    } else if (width === 854 && height === 480) {
        return "480p";
    } else if (width === 640 && height === 360) {
        return "360p";
    } else if (width === 426 && height === 240) {
        return "240p";
    } else {
        return "Unknown quality";
    }
}

form.addEventListener("submit", function (event) {
    loader.style.display = 'flex';
    event.preventDefault();
    const urlInput = document.getElementsByName("url")[0];
    const data = {
        url: urlInput.value
    };
    http.get("api/index.php", data, (err, res) => {
        if (err) {
            console.log(err);
            alert("Error connecting to the server. Please try again or refresh the page.");
            loader.style.display = 'none';
        } else {
            const response = JSON.parse(res);

            /* title */
            if (response.data) {
                if (response.data.title) {
                    title.textContent = response.data.title;
                } else {
                    title.textContent = "Video Title";
                }
                /* title */

                /* thumbnail */
                const img = document.getElementById("thumbnail");
                if (response.data.thumbnail) {
                    img.setAttribute("src", response.data.thumbnail);
                } else {
                    img.setAttribute("src", "default.png");
                }
                /* thumbnail */

                /* video */
                const videoData = response.data.videos;
                let videoButtons = '';
                let pvideoButtons = '';
                videoData.mp4.forEach(vData => {
                    const quality = calculateQuality(vData.resolution);
                    const megabytes = (vData.size / (1024 * 1024)).toFixed(2);
                    videoButtons += `
                    <a href="${vData.url}" target="_blank" rel="noopener" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2 mr-2 flex items-center justify-center">
                    <span class="text-center">${quality} - ${megabytes + ' MB'}</span>
                    </a>
                    `;
                });
                videoData.mp4.forEach(vData => {
                    const quality = calculateQuality(vData.resolution);
                    const megabytes = (vData.size / (1024 * 1024)).toFixed(2);
                    const proxy_url = encodeURIComponent(vData.url);
                    pvideoButtons += `
                    <a href="download.php?url=${proxy_url}" target="_blank" rel="noopener" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2 mr-2 flex items-center justify-center">
                    <span class="text-center">${quality} - ${megabytes + ' MB'}</span>
                    </a>
                    `;
                });
                videos.innerHTML = videoButtons;
                proxy.innerHTML = pvideoButtons;
                /* video */

                /* audios */
                const audioData = response.data.audios;
                let audioButtons = '';
                audioData.m4a.forEach(aData => {
                    const megabytes = (aData.size / (1024 * 1024)).toFixed(2);
                    audioButtons += `
                  <a href="${aData.url}" target="_blank" rel="noopener" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-full mb-2 flex justify-center items-center">
                      <span class="text-center">${aData.ext} - ${megabytes + ' MB'}</span>
                  </a>
                  `;
                });
                audios.innerHTML = `
                <div class="flex flex-wrap justify-center items-center h-full">
                    ${audioButtons}
                </div>
                `;
                /* audios */


                loader.style.display = 'none';
                result.style.display = 'flex';
            } else {
                alert("Error connecting to the server. Please try again or refresh the page.");
                loader.style.display = 'none';
            }
        }
    });
});