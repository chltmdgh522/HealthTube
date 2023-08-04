import Video from "../models/Video";

export const home = async (req, res) => {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "🏠Home🏠", videos });
};

export const search = (req, res) => {
  // TODO: Search implementation
};

export const watch = (req, res) => {
  const id = req.params.id;
  return res.render("watch", { pageTitle: "🚀watching 🚀" });
};

export const getEdit = (req, res) => {
  const id = req.params.id;
  return res.render("edit", {
    pageTitle: `Edting ??의 제목을 편집해보세요`,
  });
};

export const postEdit = (req, res) => {
  const id = req.params.id;
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