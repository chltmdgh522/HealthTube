import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";



const app=express();
const logger=morgan("dev");
app.use(logger);
app.set("view engine","pug");
app.set("views",process.cwd()+"/src/views");
app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
    });
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave: false, //모든 request마다 세션의 변경사항이 있든 없든 세션을 다시 저장한다.
    saveUninitialized: false, //uninitialized 상태인 세션을 저장한다. 여기서 uninitialized 상태인 세션이란 request 때 생성된 이후로 아무런 작업이 가해지지않는 초기상태의 세션을 말한다.
    store: MongoStore.create({mongoUrl: process.env.DB_URL}),
    cookie: {
        maxAge:20000000,
    },
}));

app.use(localsMiddleware);
app.use("/uploads",express.static("uploads")); //파일의 경로를 브로우저에게 제공해줌 
app.use("/static",express.static("assets"));
app.use("/",rootRouter); 
app.use("/videos",videoRouter);
app.use("/users",userRouter);
app.use("/api",apiRouter);


export default app;