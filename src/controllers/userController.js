import User from "../models/User";
import bcrypt from "bcrypt";
export const getJoin =(req,res) =>res.render("join",{pageTitle: "회원가입"});
export const postJoin =async(req,res) =>{
    const{name,username,email,password,password2,location}=req.body;

    if(password !==password2){
        return res.render("join",{
            pageTitle:"회원가입",
            errorMessage: "비밀번호가 일치하지 않습니다.",
        });
    }

    const usernameExists=await User.exists({username});
    if(usernameExists){
        return res.render("join",{
            pageTitle:"회원가입",
            errorMessage:"이미 존재하는 아이디 입니다.",
    });
    }

    const emailExists=await User.exists({email});
    if(emailExists){
        return res.render("join",{
            pageTitle:"회원가입",
            errorMessage:"이미 존재하는 이메일 입니다.",
    });
    }

    await User.create({
        name,
        username,
        email,
        password,
        location,
    });
    return res.redirect("/login");
};
export const getLogin=(req,res)=>{
    return res.render("login",{pageTitle:"로그인"});
}
export const postLogin=async(req,res)=>{
    const{username,password}=req.body;
    const exists=await User.exists({username})
    if(!exists){
        return res.status(400).render("login",{pageTitle:"로그인",errorMessage:"존재하지 않은 아이디입니다."});
    }
    const user=await User.findOne({username});
    const ok=await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login",{
            pageTitle:"로그인",
            errorMessage:"비밀번호가 틀렸습니다."
        });
    }

    req.session.loggedIn=true;
    req.session.user=user;
    
    return res.redirect("/");
}

export const startGithubLogin=(req,res)=>{
    const baseUrl="https://github.com/login/oauth/authorize";
    const config={
        client_id:"7252c77043ef4734b0b9",
        allow_signup:false,
        scope:"read:user user:email",
    };
    const params=new URLSearchParams(config).toString();
    const finalUrl=`${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}

export const finishGithubLogin=(req,res)=>{
    
}

export const edit=(req,res)=>res.send("edit");
export const remove=(req,res)=>res.send("Delete User" );

export const logout=(req,res)=>res.send("Log Out" );
export const see=(req,res)=>res.send("See User" );
