import User from "../models/User";
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
    res.end();
}


export const edit=(req,res)=>res.send("edit");
export const remove=(req,res)=>res.send("Delete User" );

export const logout=(req,res)=>res.send("Log Out" );
export const see=(req,res)=>res.send("See User" );
