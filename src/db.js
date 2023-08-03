import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/cshhealthtube",
{useNewUrlParser:true,
useUnifiedTopology:true,}
);

const db= mongoose.connection;
const handleOpen=() => console.log("데이터베이스 연결됨");
const handleError=(error)=> console.log("에러남", error);
db.on("error",handleError);
db.once("open", handleOpen);