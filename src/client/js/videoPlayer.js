const video=document.querySelector("video")
const playBtn =document.getElementById("play");
const muteBtn=document.getElementById("mute");
const volumeRange=document.getElementById("volume");
const currentTime=document.getElementById("currentTime");
const totalTime=document.getElementById("totalTime");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick=(e)=>{
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    playBtn.innerText=video.paused ? "플레이" : "정지";
};

const handleMuteClick=(e)=>{
    if(video.muted){
        video.muted=false;
    }else{
        video.muted=true;
    }
    muteBtn.innerText=video.muted ? "소리" : "무음";
    volumeRange.value=video.muted ? 0 : volumeValue; 
};

const handleVolumeChange=(evnet)=>{
    const {
        target: {value},
    }=event;
    if(video.muted){
        video.muted=false;
        muteBtn.innerText="무음";
    }
    volumeValue=value;
    video.volume=value;
};

const formatTime=(seconds) => new Date(seconds *1000).toISOString().substring(11,19); //초단위 포멧
const handleLoadedMetadate=()=>{
    totalTime.innerText=formatTime(Math.ceil(video.duration)); //비디오의 길이

};

const handleTimeUpdate=()=>{
    currentTime.innerText = formatTime(Math.floor(video.currentTime));

};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click",handleMuteClick);
volumeRange.addEventListener("change",handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadate);
video.addEventListener("timeupdate",handleTimeUpdate);


