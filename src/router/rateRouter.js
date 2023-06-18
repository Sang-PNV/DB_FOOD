import express from "express";
import {
  postRate,
  getRateByRes,
  getRateByUser,
} from "../controller/rateController.js";

const rateRouter = express.Router();
rateRouter.post("/post-rate", postRate);
rateRouter.get("/get-rate/res/:res_id", getRateByRes);
rateRouter.get("/get-rate/user/:user_id", getRateByUser);
export default rateRouter;
