import '../styles/index.scss';
import './control';
import './pointer';
import YouTubePlayer from 'yt-player';
import {getRandomVideo, setVideos } from './video';
import Axios from 'axios';


if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

let frackDiscord = 'frack#9154';
let frackYoutube = 'https://www.youtube.com/c/Frackk';
let frackSteam = 'https://steamcommunity.com/id/773/';


Axios({
  method: 'get',
  url: 'https://my-json-server.typicode.com/bloodred17/demo/videos',
})
  .then(function (response) {
    try {
      // console.log(response.data);
      const videos = response.data;
      setVideos(videos.map(vid => vid.src));
      player.load(getRandomVideo());
      player.mute();

      setTimeout(() => {
        triggerEvent(document.getElementById('play'), 'click' );
      }, 1000);

    } catch (e) {
      console.log(e);
    }
  })
  .catch(function (error) {
    console.log(error);
  });



function triggerEvent(elem, event) {
  const clickEvent = new Event(event); // Create the event.
  elem.dispatchEvent(clickEvent);    // Dispatch the event.
}

// <a target="_blank" onClick="alert('discord: frack#9154');">discord</a> -
document.querySelector('#app').innerHTML = `
<div class="video-background">
  <div class="video-foreground">
    <div id="player"></div>

  </div>
</div>

<div class="center">
  <div class="text-center text-white p-4 rounded-3 frack">
    <p style="letter-spacing: 4px; font-size: 24px;">
      frack
    </p>
    <br>
    <div style="letter-spacing: 4px; font-size: 12px;" class="links">
      <a target="_blank" href="${frackSteam}" class="text-white">steam</a> - 
      <a target="_blank" data-bs-toggle="modal" data-bs-target="#exampleModal">discord</a> - 
      <a target="_blank" href="${frackYoutube}" class="text-white">youtube</a>
    </div>
    <br>
    <div class="pp" style="cursor: pointer; letter-spacing: 2px; font-size: 14px;">
      <a id="play">play</a> /
      <a id="pause">pause</a>
    </div>
    <br>
    <div class="pp" style="cursor: pointer; letter-spacing: 2px; font-size: 14px;">
      <a id="mute">mute</a> /
      <a id="unmute">unmute</a>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-body">
        <div class="d-flex justify-content-center align-items-center">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#8c9eff" d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"/></svg>
            </div>
            <div class="text">
              <h5 class="p-2" style="color: #8c9eff"> ${frackDiscord} </h5>            
            </div>
            <div class="action ms-auto">
              <button id="copy" type="button" class="btn btn-primary btn-sm" onclick="clipboard()" data-bs-dismiss="modal">Copy</button>
            </div>
          </div>
      </div>
      
    </div>
  </div>
</div>
`;

const player = new YouTubePlayer('#player', {
  autoplay: true,
  mute: true,
  controls: false,
  modestBranding: true,
  related: false,
});


const playVideo = () => {
  const state = player.getState();
  if (state !== 'playing') {
    player.play();
  }
};
const pauseVideo = () => {
  const state = player.getState();
  if (state !== 'paused') {
    player.pause();
  }
};

document.getElementById("play").addEventListener("click", playVideo);

document.getElementById("pause").addEventListener("click", pauseVideo);

document.querySelector('#mute').addEventListener('click', () => {
  player.mute();
});

document.querySelector('#unmute').addEventListener('click', () => {
  player.unMute();
});

player.on('timeupdate', (seconds) => {
  const duration = player.getDuration();
  if (duration > 2 && seconds > Math.round(duration - 2)) {
    player.pause();
    player.load(getRandomVideo(), true);
  }
});


const clipboard = () => {
  navigator.clipboard.writeText(frackDiscord);
};
document.querySelector('#copy').addEventListener('click', clipboard);
