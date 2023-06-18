import express from "express";
import { postOrder } from "../controller/orderController.js";

const orderRouter = express.Router();
orderRouter.post("/post-order", postOrder);
export default orderRouter;
