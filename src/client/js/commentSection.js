const videoContainer=document.getElementById("videoContainer");
const form= document.getElementById("commentForm");
const textarea=document.querySelector("textarea");
const btn=form.querySelector("button");

const addComment=(text)=>{
    const videoComments=document.querySelector(".video__comments ul");
    const newComment=document.createElement("li");
    newComment.className="video__comment";
    const icon=document.createElement("i");
    icon.className="fas fa-comment";
    const span=document.createElement("span");
    span.innerText=` ${text}`;
    const span2 = document.createElement("span");
    span2.innerText = "❌";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);

    videoComments.prepend(newComment);

};

const handleSubmit=async (event)=>{
    event.preventDefault();
    const text=textarea.value;
    const videoId = videoContainer.dataset.id;
    if(text===""){
        return;
    }
    const{status}=await fetch(`/api/videos/${videoId}/comments`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({text}), // {text} 그냥 이런식으로 하면 서버가 string으로 인식함 그래서 저렇게 해줌
        
    });
    textarea.value="";
    if(status==201){
        addComment(text);
    }
};

form.addEventListener("submit",handleSubmit); //click 쓰면 클릭하는것만 감지하기 때문,,, 우리는 form 제출을 감지해야함 