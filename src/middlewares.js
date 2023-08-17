import multer from "multer";
export const localsMiddleware=(req,res,next)=>{
    res.locals.loggedIn=Boolean(req.session.loggedIn);
    res.locals.siteName="HealthTube";
    console.log(res.locals); 
    res.locals.loggedInUser=req.session.user || {}; //locals를 통해 템플릿 엔진에서 사용가능
    next();
};

export const protectorMiddleware=(req,res,next)=>{
    if(req.session.loggedIn){
       return next();
    }else{
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware=(req,res,next)=>{
    if(!req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/");
    }
};

export const avatarUpload=multer({
    dest:"uploads/avatars/",
    limits:{
    fileSize:3000000,
},
});
export const videoUpload=multer({
    dest:"uploads/videos/",
    limits:{
        fieldSize:30000000, //30mb
    },
});