import '../assets/css/style.css';
import autumnMP4 from '../assets/media/autumn.mp4';
import autumnMP3 from '../assets/media/autumn.mp3';
import playerPlayIcon from '../assets/img/icons/play.svg';
import pauseIcon from "../assets/img/icons/pause.svg";
import stopIcon from '../assets/img/icons/stop.svg';
import volumeIcon from '../assets/img/icons/volume.svg';
import volumeMuteIcon from '../assets/img/icons/volume-mute.svg';
import pipIcon from '../assets/img/icons/popup.svg'
import fullScreen from '../assets/img/icons/fullscreen.svg'

const app = document.getElementById('app');
app.innerHTML = `
<h1>JAVASCRIPT Video testing</h1>
<div class="player" >

   <!-- <audio class="media">
    <source src="${autumnMP3}" type="audio/mpeg">
    </audio> -->

    <video class="media" controls>
        <source src="${autumnMP4}" type="video/mp4">
        <p>
            HTML5 is not supported in this browser
            <a href="${autumnMP4}" Instead you can download the file></a>
        </p>
    </video> 

    <div class="player__controls">

        <button type="button" class="player__play" aria-label="Play Pause">
            <img src="${playerPlayIcon}" alt="Play Pause Icon">
        </button>

        <button type="button" class="player__stop" aria-label="Stop">
            <img src="${stopIcon}" alt="Stop Icon">
        </button>

        <div class="player__progress">
            <input type="range" class="player__timeline"  min="0" max="100" value="0">
            <span class="player__duration"></span>
        </div>

        <div class="player__sound">
            <img src="${volumeIcon}" alt="Volume Icon" class="player__mute">
            <input type="range" class="player__volume"  min="0" max="100" value="100">
        </div>

        <button type="button" class="player__pip"><img src="${pipIcon}" alt="Picture in Picture Icon"></button>
        <button type="button" class="player__fullscreen"><img src="${fullScreen}" alt="FullScreen Mode"></button>
    </div>
</div>`;



const player = document.querySelector('.player');
const media = document.querySelector('.media');
const play = player.querySelector('.player__play');
const playPause = play.querySelector('img');
const stop = player.querySelector('.player__stop');
const timeline = player.querySelector('.player__timeline');
const duration = player.querySelector('.player__duration');
const volume = player.querySelector('.player__sound');
const volumeDom = player.querySelector('.player__volume');
const volumeToggle = player.querySelector('.player__mute');
const pip = player.querySelector('.player__pip');
const fullScreenDom = player.querySelector('.player__fullscreen');

// console.dir(document);
// console.dir(pip);
console.dir(media);

let timeDuration;

const togglePlayButton =()=>{
    if(media.paused){
        playPause.src = pauseIcon;
        media.play();
    }else{
        playPause.src = playerPlayIcon;
        media.pause();
    }
}

const stopPlayButton =()=>{
    media.currentTime =0;
    playPause.src = playerPlayIcon;
    media.pause();
}

const getUpdatedTime =(Time)=>{
    const time = parseInt(Time.toFixed(),10);
    const minute = `${parseInt(time/60)}`.padStart(2,0);
    const second = `${parseInt(time%60)}`.padStart(2,0);
    return `${minute}:${second}`
}

const setInitialProgressData =(e)=>{
    timeDuration = getUpdatedTime(e.target.duration);
    duration.innerText = `00:00 /${timeDuration}`;
}

const setProgressBar =(e)=>{
    // console.dir(e.target.currentTime);
    // console.dir(timeline.value);
    const currentTime = getUpdatedTime(e.target.currentTime);
    const progress = (e.target.currentTime/e.target.duration)*100;
    timeline.value = progress;
    duration.innerText =   `${currentTime} / ${timeDuration}`;
}

const skipToPosition =(e)=>{
    const currentTime = parseInt(e.target.value,10)/100;
    // console.log(media.duration*currentTime);
    media.currentTime = media.duration*currentTime;
}

const setVolume =(e)=>{
    // console.dir(e.target);
    const sound = parseInt(e.target.value,10)/100;
    media.volume = sound;
    volumeToggle.src = media.volume>0 ? volumeIcon : volumeMuteIcon;
}

const setVolumeFromMedia = (e)=>{
    console.dir(e.target);
    console.log(e.target.volume);
    const sound = parseInt((e.target.volume)*100,10);
    console.log('sound',sound,'volume',volumeDom.value);
    volumeDom.value =sound;
    volumeToggle.src = e.target.volume>0 ? volumeIcon : volumeMuteIcon;
}

const toggleVolume = ()=>{
    const isMute = media.volume === 0;
    volumeToggle.src = isMute ? volumeIcon : volumeMuteIcon;
    volume.value = isMute ? 100:0;
    volume.dispatchEvent(new Event('input'));
    media.volume = isMute ? 1:0;
}

play.addEventListener('click',togglePlayButton);
stop.addEventListener('click',stopPlayButton);
media.addEventListener('durationchange',setInitialProgressData);
media.addEventListener('timeupdate',setProgressBar);
media.addEventListener('ended',stopPlayButton);
timeline.addEventListener('input',skipToPosition);
volume.addEventListener('input',setVolume);
volumeToggle.addEventListener('click',toggleVolume);
media.addEventListener('volumechange',setVolumeFromMedia);

const initPipEnabled = ()=>{
    pip.addEventListener('click',()=>{
        if(!document.pictureInPictureElement){
            media.requestPictureInPicture();
        }
        else{
            document.exitPictureInPicture();
        }
    })
}

if('pictureInPictureEnabled' in document){
    initPipEnabled();
}

let wasPlaying;

const initVisibility =()=>{
    const handleVisibility = (e)=>{
        const {visibilityState} = e.target;
    
        switch(visibilityState){

            case 'hidden':{
                if(!media.paused){
                    togglePlayButton();
                    wasPlaying = true;
                }
                else{
                    wasPlaying=false;
                }
                
                break;
            }
                
            case 'visible':{
                if(wasPlaying){
                    togglePlayButton(); 
                }
                break;
            }
        }
    } 
    document.addEventListener('visibilitychange',handleVisibility);
}

if('visibilityState' in document){
    initVisibility();
}

const initFullScreen =()=>{
    const handleFullScreen =()=>{
        media.requestFullscreen();
    }
    fullScreenDom.addEventListener('click',handleFullScreen);
}


if(document.fullscreenEnabled){
    initFullScreen();
}
// media.addEventListener('durationchange', (e)=>console.dir(e.target.duration));
// media.addEventListener('canplay',()=>console.log('CAN PLAY'));
// media.addEventListener('canplaythrough',()=>console.log('CAN PLAY THROUGH'));
// media.addEventListener('timeupdate', (e)=> console.dir(e.target.currentTime));
// media.addEventListener('play',(e)=>console.log('play',!e.target.paused));
// media.addEventListener('playing',()=>console.log('Playing now'));
// media.addEventListener('pause',(e)=>console.log('paused',e.target.paused));
// media.addEventListener('ended',()=>console.log('ended'));