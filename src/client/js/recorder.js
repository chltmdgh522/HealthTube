const startBtn=document.getElementById("startBtn");
const video=document.getElementById("preview");

let stream;
let recorder;
let videoFile;


const handleDownload=()=>{
    const a=document.createElement("a");
    a.href=videoFile;
    a.download="녹화 다운로드";
    document.body.appendChild(a); //가짜 url 생성 
    a.click();
};

const handleStop=()=>{
    startBtn.innerText="다운로드"
    startBtn.removeEventListener("click",handleStop);
    startBtn.addEventListener("click",handleDownload);
    recorder.stop();
};

const handleStart=()=>{
    startBtn.innerText="녹화 중지"
    startBtn.removeEventListener("click",handleStart);//반복되는 것을 막을려고
    startBtn.addEventListener("click",handleStop);

    recorder=new window.MediaRecorder(stream);
    recorder.ondataavailable=(event)=>{ // 녹화가 멈추면 발생하는 이벤트이다. 
        videoFile=URL.createObjectURL(event.data); //녹화된 비디오 url 주기  즉 
        video.srcObject=null;
        video.src=videoFile;
        video.loop = true;
        video.play();
    };
    recorder.start();
 
};

const init=async()=>{
    stream=await navigator.mediaDevices.getUserMedia({
        audio:false,
        video:{width:200, height:200},
    });
    video.srcObject=stream;
    video.play();
};
init();
startBtn.addEventListener("click",handleStart);