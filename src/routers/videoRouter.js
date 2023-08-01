import express from "express";

const videoRouter=express.Router();

const handleWatch=(req,res)=>res.send("Watch Video");
const handleEdit=(req,res)=>res.send("Edit Video");

videoRouter.get("/watch",handleWatchVideo);
videoRouter.get("/edit", handleEdit);

export default videoRouter;