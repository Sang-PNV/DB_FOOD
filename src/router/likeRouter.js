import express from "express";
import {
  getLikeByRes,
  postLike,
  getLikeByUser,
} from "../controller/likeController.js";

const likeRouter = express.Router();
likeRouter.post("/post-like", postLike);
likeRouter.get("/get-like/res/:res_id", getLikeByRes);
likeRouter.get("/get-like/user/:user_id", getLikeByUser);

export default likeRouter;
