import User from "../models/User";
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
    const exists=await User.exists({username, socialOnly:false})
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

export const edit=(req,res)=>res.send("edit");
export const remove=(req,res)=>res.send("Delete User" );


export const see=(req,res)=>res.send("See User" );
