const video=document.querySelector("video")
const playBtn =document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn=document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange=document.getElementById("volume");
const currentTime=document.getElementById("currentTime");
const totalTime=document.getElementById("totalTime");
const timeline=document.getElementById("timeline");
const fullScreenBtn=document.getElementById("fullscreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer=document.getElementById("videoContainer");
const videoControls=document.getElementById("videoControls");

let controlsTimeout =null;
let controlsMovementTimeout=null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick=(e)=>{
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick=(e)=>{
    if(video.muted){
        video.muted=false;
    }else{
        video.muted=true;
    }
    muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
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
const handleLoadedMetadata=()=>{
    totalTime.innerText=formatTime(Math.ceil(video.duration)); //비디오의 길이
    timeline.max=Math.floor(video.duration); //비디오 길이 반환 JS에서 브라우저에게 max 세팅 함

};

const handleTimeUpdate=()=>{
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value=Math.floor(video.currentTime);

};

const handleTimelineChange =(event)=>{
    const{
        target:{value},
    } = event;
    video.currentTime=value;
};

const handleFullscreen=()=>{
    const fullscreen=document.fullscreenElement; //널이면 전체화면아님 그래서 else가 실행됨 
    if(fullscreen){
        document.exitFullscreen();
        fullScreenIcon.classList = "fas fa-expand";
    }else{
        videoContainer.requestFullscreen();
        fullScreenIcon.classList = "fas fa-compress";
    }
};

const hideControls=()=> videoControls.classList.remove("showing");

const handleMouseMove=()=>{
    if(controlsTimeout){
        clearTimeout(controlsTimeout);// 시간이 계속 안사라져서 이거 해줘야됨
        controlsTimeout=null; 
    }
    if(controlsMovementTimeout){ // 비디오 안에서 커서 움직일때 
        clearTimeout(controlsMovementTimeout); 
        controlsMovementTimeout=null; 
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout=setTimeout(hideControls,3000); //비디오 안에서 3초동안 계속 움직이는데 만약에 멈추면 바로위에 if문 실행이 안됨 
    //그러면 3초가 지났으니간 hide 실행
};

const handleMouseLeave=()=>{
    controlsTimeout=setTimeout(hideControls,3000);
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click",handleMuteClick);
volumeRange.addEventListener("change",handleVolumeChange); //소리
video.addEventListener("loadedmetadata", handleLoadedMetadata); // 비디오 길이 
video.addEventListener("timeupdate",handleTimeUpdate); //시간 업데이트
timeline.addEventListener("input",handleTimelineChange); // 비디오 시간 연결
fullScreenBtn.addEventListener("click",handleFullscreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);


