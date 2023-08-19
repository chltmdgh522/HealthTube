const video=document.querySelector("video")
const playBtn =document.getElementById("play");
const muteBtn=document.getElementById("mute");
const time=document.getElementById("time");
const volume=document.getElementById("volume");

const handlePlayClick=(e)=>{
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
};

const handleMute=(e)=>{
    
};

const handlePause=(e)=>{
    playBtn.innerText="플레이";
} 

const handlePlay=()=>{
    playBtn.innerText="정지";
} 

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click",handleMute);

video.addEventListener("pause",handlePause);
video.addEventListener("play",handlePlay);
