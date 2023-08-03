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
    res.render("home",{pageTitle:"🏠Home🏠",videos});
}
export const search=(req,res)=>{

};
export const watch=(req,res)=>{
    const id= req.params.id;
    const video =videos[id-1];
    return res.render("watch",{pageTitle:`🚀 ${video.title} 🚀`,video});
};
export const getEdit=(req,res)=>{
    
    const id= req.params.id;
    const video =videos[id-1];
    return res.render("edit",{pageTitle:`${video.title}의 제목을 편집해보세요`,video});
};
export const postEdit=(req,res)=>{
    const id= req.params.id;
    const title= req.body.title;
    videos[id-1].title=title;
    return res.redirect(`/videos/${id}`);
};


export const getUpload=(req,res)=>{
    return res.render("upload",{pageTitle: "🔄Upload Video🔄"});
};
export const postUpload=(req,res)=>{
 
    const newVideo={
        title: req.body.title,
        rating:5,
        comments:2,
        createdAt:"just now",
        views:59,
        id: videos.length+1,
    }
    videos.push(newVideo);
    return res.redirect("/");
};

export const deleteVideo=(req,res)=>{
     return res.send("Delete Video");
}