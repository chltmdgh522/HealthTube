import "regenerator-runtime";
import "dotenv/config"; //몽고서버주소와 세션 secret 문구를 환경변수에서 설정해줘서 import해줌 
import "./db";//바로 db연결 
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = process.env.PORT || "3000"
const handleListening=()=>console.log(`${PORT}서버 세상의 오신것을 환영합니다😊`);

app.listen(PORT,handleListening);
