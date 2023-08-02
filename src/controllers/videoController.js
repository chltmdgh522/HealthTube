export const trendingVideos =(req,res) =>res.render("home");
export const search=(req,res)=>res.render("watc");

export const see=(req,res)=>res.render("watch");
export const edit=(req,res)=>res.render("edit");
export const upload=(req,res)=>res.send("Upload");
export const deleteVideo=(req,res)=>{
     return res.send("Delete Video");
}