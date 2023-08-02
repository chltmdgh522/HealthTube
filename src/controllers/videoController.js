const fakeUser={
    username:"최승호",
    loggedIn:true, 
}

export const trendingVideos =(req,res) =>{
    const videos=[
        {
            title:"a",
            rating:5,
            comments:2,
            createdAt:"2분전",
            views:59,
            id:1,
        },
        {
            title:"b",
            rating:5,
            comments:2,
            createdAt:"2분전",
            views:59,
            id:1,
        },
        {
            title:"c",
            rating:5,
            comments:2,
            createdAt:"2분전",
            views:59,
            id:1,
        },
    ];
    res.render("home",{pageTitle:"Home",fakeUser:fakeUser,videos});
}
export const search=(req,res)=>res.render("watc");

export const see=(req,res)=>res.render("watch",{pageTitle:"영상 시청"});
export const edit=(req,res)=>res.render("edit");
export const upload=(req,res)=>res.send("Upload");
export const deleteVideo=(req,res)=>{
     return res.send("Delete Video");
}