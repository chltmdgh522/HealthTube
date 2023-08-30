const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");
const deleteIcon = document.querySelectorAll(".deleteBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");

  newComment.dataset.id = id;

  const icon = document.createElement("i");
  const span = document.createElement("span");


  newComment.className = "video__comment";
  icon.className=".fa-heartbeat";


  newComment.appendChild(icon);

  span.innerText = ` ${text}`;


  newComment.appendChild(span);



  videoComments.prepend(newComment);


};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }), // {text} 그냥 이런식으로 하면 서버가 string으로 인식함 그래서 저렇게 해줌
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};




  form.addEventListener("submit", handleSubmit);//click 쓰면 클릭하는것만 감지하기 때문,,, 우리는 form 제출을 감지해야함 

