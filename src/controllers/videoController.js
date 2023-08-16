import Video, { formatHashTags } from "../models/Video";

export const home = async (req, res) => {
    const videos = await Video.find({}).sort({createdAt:"desc"});
    return res.render("home", { pageTitle: "🏠Home🏠", videos });
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
  const file=req.file;
  const { title,description,hashtags } = req.body;
 try{await Video.create({
    title,
    description,
    fileUrl:file.path,
    hashtags: formatHashTags(hashtags),
  })
    return res.redirect("/");
}catch(error){
    console.log(error);
    return res.render("upload", { pageTitle: "🔄영상 업로드🔄",errorMessage:error._message });
}
};


export const deleteVideo=async(req,res)=>{
  const{id}=req.params;
  await Video.findByIdAndDelete(id);

  return res.redirect("/");
};

export const search=async(req,res)=>{
  const {keyword}=req.query;
  let videos=[];
  if(keyword){
    videos=await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`,"i"), //검색 자유 
      },
    });
  }
  return res.render("search",{pageTitle:"Search",videos});
}