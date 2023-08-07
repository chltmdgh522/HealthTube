import Video from "../models/Video";

export const home = async (req, res) => {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "🏠Home🏠", videos });
};

export const search = (req, res) => {
  // TODO: Search implementation
};

export const watch = async(req, res) => {
  const id = req.params.id;
  const video= await Video.findById(id);
  if(video){
  return res.render("watch", { pageTitle: "🚀"+video.title+"🚀", video })
  }
  return res.render("404",{pageTitle: "해당 영상이 없습니다."});
};

export const getEdit = async(req, res) => {
  const id = req.params.id;
  const video= await Video.findById(id);
  if(!video){
    return res.render("404",{pageTitle: "해당 영상이 없습니다."});
  }
  return res.render("edit", {pageTitle: `"${video.title}"의 영상을 편집해보세요`,video });
};

export const postEdit = async (req, res) => {
  const id = req.params.id;
  const video= await Video.findById(id);
  const{title,description,hashtags}=req.body;
  if(!video){
    return res.render("404",{pageTitle: "영상이 없어요!"})
  }
  video.title=title;
  video.description=description;
  video.hashtags=hashtags.split(",").map((word)=>`#${word}`);
  await video.save();
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "🔄Upload Video🔄" });
};

export const postUpload = async (req, res) => {
  const { title,description,hashtags } = req.body;
 try{await Video.create({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map((word)=>`#${word}`),
  })
    return res.redirect("/");
}catch(error){
    console.log(error);
    return res.render("upload", { pageTitle: "🔄Upload Video🔄",errorMessage:error._message });
}
};

export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};