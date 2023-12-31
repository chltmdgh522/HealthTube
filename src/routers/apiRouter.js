import express from "express";
import { registerView,createComment,deleteComment } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comments", createComment);
apiRouter.delete("/videos/:id([0-9a-f]{24})/comments/delete", deleteComment);

export default apiRouter;