import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT=4000;
const handleListening=()=>console.log(`${PORT}서버 세상의 오신것을 환영합니다😊`);

app.listen(PORT,handleListening);