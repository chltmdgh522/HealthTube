import express from "express";
import { getEdit,postEdit,remove,see,logout,startGithubLogin,finishGithubLogin, postChangePassword, getChangePassword } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, uploadFiles } from "../middlewares";
const userRouter=express.Router();

userRouter.get("/logout",protectorMiddleware,logout);

userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadFiles.single("avatar"),postEdit); //업로드 파일에 싱글하나 아바타경로부터
userRouter.get("/remove", remove);
userRouter.get("/github/start",publicOnlyMiddleware,startGithubLogin);
userRouter.get("/github/finish",publicOnlyMiddleware, finishGithubLogin);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);


userRouter.get(":id",see);

export default userRouter;