import User from "../models/User";
import Video from "../models/Video";
import fetch from "node-fetch";
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
    const exists=await User.exists({username, socialOnly:false});
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
        client_id: process.env.GH_CLIENT,
        allow_signup:false,
        scope:"read:user user:email",
    };
    const params=new URLSearchParams(config).toString();
    const finalUrl=`${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}

export const finishGithubLogin=async(req,res)=>{
    const baseUrl="https://github.com/login/oauth/access_token";
    const config={
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params=new URLSearchParams(config).toString();
    const finalUrl=`${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch(finalUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        })
      ).json();
      if ("access_token" in tokenRequest) {
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
          await fetch(`${apiUrl}/user`, {
            headers: {
              Authorization: `token ${access_token}`,
            },
          })
        ).json();
        console.log(userData);
        const emailData = await (
          await fetch(`${apiUrl}/user/emails`, {
            headers: {
              Authorization: `token ${access_token}`,
            },
          })
        ).json();
        const emailObj = emailData.find(
          (email) => email.primary === true && email.verified === true
        );
        if (!emailObj) {
          return res.redirect("/login");
        }
        let user = await User.findOne({ email: emailObj.email });
        if (!user) {
          user = await User.create({
            avatarUrl: userData.avatar_url,
            name: userData.name,
            username: userData.login,
            email: emailObj.email,
            password: "",
            socialOnly: true,
            location: userData.location,
          });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
      } else {
        return res.redirect("/login");
      }
    };
    export const logout = (req, res) => {
        req.session.destroy();
        return res.redirect("/");
      };

export const getEdit=(req,res)=>{
  return res.render("edit-profile",{pageTitle:"프로필 수정"});
};

export const postEdit=async(req,res)=>{
  const{
    session:{
      user:{_id, avatarUrl},
    },
    body: {name,email,username,location},
    file,
  }= req;
  const updateUser=await User.findByIdAndUpdate(_id,{
    avatarUrl: file ? file.path:avatarUrl,
    name,
    email,
    username,
    location,
  },
  {new: true}); //find 함수가 업데이트 된후 데이터를 준다. 
  req.session.user=updateUser;
  return res.redirect("/users/edit");
};

export const getChangePassword=(req,res)=>{
  if(req.session.user.socialOnly==true){
    return res.redirect("/");
  }
  return res.render("change-password",{pageTitle:"비밀번호 변경"});
};
export const postChangePassword=async(req,res)=>{
  const id=req.session.user._id;
  const password=req.session.user.password;
  const{oldPassword,newPassword,newPasswordConfirm}=req.body;
  const ok=await bcrypt.compare(oldPassword,password);
  if(!ok){
    return res.status(400).render("change-password",
    {pageTitle:"비밀번호 변경",
    errorMessage:"현재 비밀번호가 일치하지 않습니다."});
  }

  if(newPassword!=newPasswordConfirm){
    return res.status(400).render("change-password",
    {pageTitle:"비밀번호 변경",
    errorMessage:"새 비밀번호가 일치하지 않습니다."});
  }
  const user=await User.findById(id);  
  user.password=newPassword;
  await user.save();
  req.session.user.password=user.password;
  return res.redirect("/users/logout")
};
export const remove=(req,res)=>res.send("Delete User" );


export const see=async(req,res)=>{
  const {id}=req.params;
  //const user = await User.findById(id).populate("videos")
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      
      model: "User",
    },
  });
  console.log(user);
  if(!user){
    return res.status(404).render("404",{pageTitle:"정보가 없습니다."});
  }
  return res.render("profile",{
    pageTitle: `${user.name}의 프로필`,
    user,
  });
};
