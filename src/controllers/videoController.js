import Video, { formatHashTags } from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";
import { async } from "regenerator-runtime";

export const home = async (req, res) => {
    //const videos = await Video.find({}).sort({createdAt:"desc"});
    const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
    return res.render("home", { pageTitle: "🏠Home🏠", videos });
};

export const watch = async(req, res) => {
  const id = req.params.id;
  const video= await Video.findById(id).populate("owner").populate("comments");
   //  populate는 이것 const owner=await User.findById(video.owner);
   // 이것은 User랑 연결된거 알아서 모든 정보 보여줌
   // render에 굳이 안써도 됨
  if(video){
  return res.render("watch", { pageTitle: "🚀"+video.title+"🚀", video })
  }
  return res.render("404",{pageTitle: "해당 영상이 없습니다."});
};

export const getEdit = async(req, res) => {
  const id = req.params.id;
  const video= await Video.findById(id);
  const{
    user:{_id},
  }=req.session;
  if(!video){
    return res.render("404",{pageTitle: "해당 영상이 없습니다."});
  }
  if(String(video.owner) !=String(_id) ){
    return res.status(403).redirect("/");
  }
  return res.render("edit", {pageTitle: `"${video.title}"의 영상을 편집해보세요`,video });
};

export const postEdit = async (req, res) => {
  const id = req.params.id;
  const video= await Video.exists({_id:id});
  const{title,description,hashtags}=req.body;
  if(!video){
    return res.render("404",{pageTitle: "영상이 없어요!"})
  }

  
  await Video.findByIdAndUpdate(id,{
    title,description, 
    hashtags: formatHashTags(hashtags),
  })
  
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "🔄영상 업로드🔄" });
};

export const postUpload = async (req, res) => {
  const{
    user:{_id}
  }=req.session;
  const { video, thumb } = req.files;
  
  const { title,description,hashtags } = req.body;
 try{
  const newVideo= await Video.create({
    title,
    description,
    fileUrl: video[0].path,
    thumbUrl: thumb[0].path.replace(/[\\]/g, "/"),
    owner:_id,
    hashtags: formatHashTags(hashtags),
  });
  const user= await User.findById(_id);
  user.videos.push(newVideo._id);

  user.save();
    return res.redirect("/");
}catch(error){
    console.log(error);
    return res.render("upload", { pageTitle: "🔄영상 업로드🔄",errorMessage:error._message });
}
};


export const deleteVideo = async (req, res) => {
const { id } = req.params;
const {
user: { _id },
} = req.session;
const video = await Video.findById(id);
const user = await User.findById(_id);
if(!video){
return res.status(404).render("404", { pageTitle: "Video not found." });
}
if (String(video.owner) !== String(_id)) {
return res.status(403).redirect("/");
}

await Video.findByIdAndDelete(id);
user.videos.splice(user.videos.indexOf(id),1);
user.save();
return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async(req,res)=>{
  const {id}=req.params;
  const video=await Video.findById(id);
  if(!video){
    return res.status(404)
  } 
  video.meta.views =video.meta.views+1;
  video.save();
  return res.status(200);
};

export const createComment=async(req,res)=>{
  const {
    session:{user},
    body:{text},
    params:{id},
  }=req;

  const video= await Video.findById(id);

  if(!video){
    return res.sendStatus(404);
  }
  const comment=await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id); // populate를 위해 comment한거(commetn id)를 저장 
  video.save();
  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const {
    session: { user },
    body: { commentId },
    params: { id },
  } = req;

  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }

  video.comments = video.comments.filter((id) => id !== commentId);
  video.save();

  await Comment.findByIdAndDelete(commentId);

  return res.sendStatus(200);
};

export const getNotice=(req,res)=>{
return res.render("notice",{pageTitle:"📢notice"});
};