export const trendingVideos =(req,res) =>res.send("Home Page Videos");
export const search=(req,res)=>res.send("Search");

export const see=(req,res)=>{
   return res.send("Watch")
};
export const edit=(req,res)=> {
    return res.send("Edit")
};
export const upload=(req,res)=>res.send("Upload");
export const deleteVideo=(req,res)=>{
     return res.send("Delete Video");
}