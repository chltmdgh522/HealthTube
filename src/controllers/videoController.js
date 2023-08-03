const fakeUser = {
    username: "최승호",
    loggedIn: false,
  };
let videos=[
    {
        title:"First Video",
        rating:5,
        comments:2,
        createdAt:"2분전",
        views:1,
        id:1,
    },
    {
        title:"Second Video",
        rating:5,
        comments:2,
        createdAt:"2분전",
        views:59,
        id:2,
    },
    {
        title:"Thrid Video",
        rating:5,
        comments:2,
        createdAt:"2분전",
        views:59,
        id:3,
    },
];
export const trendingVideos =(req,res) =>{
    res.render("home",{pageTitle:"Home",fakeUser:fakeUser,videos});
}
export const search=(req,res)=>{

};
export const watch=(req,res)=>{
    const id= req.params.id;
    const video =videos[id-1];
    return res.render("watch",{pageTitle:`영상 시청 ${video.title}`,fakeUser,video});
}
export const getEdit=(req,res)=>{
    const id= req.params.id;
    const video =videos[id-1];
    return res.render("edit",{pageTitle:`${video.title}의 영상을 편집해보세요`,video,fakeUser:fakeUser});
}
export const postEdit=(req,res)=>{}


export const upload=(req,res)=>res.send("Upload");
export const deleteVideo=(req,res)=>{
     return res.send("Delete Video");
}