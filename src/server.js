import express from "express";
import morgan from "morgan";

const app=express();

const PORT=4000;


const handleHome=(req,res) => {
    return res.send("ok");
};

app.use(morgan("dev"));
app.get("/", handleHome);


const handleListening=()=>console.log("4000ㅎㅎ");

app.listen(PORT,handleListening);