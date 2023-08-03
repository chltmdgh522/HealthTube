import "./db";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";



const app=express();
const PORT=4000;
const logger=morgan("dev");
app.use(logger);
app.set("view engine","pug");
app.set("views",process.cwd()+"/src/views");

app.use(express.urlencoded({extended: true}));
app.use("/videos",videoRouter);
app.use("/",globalRouter);
app.use("/users",userRouter);





const handleListening=()=>console.log("4000서버 세상의 오신것을 환영합니다😊");

app.listen(PORT,handleListening);