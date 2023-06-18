import express from "express";
import {
  createFood,
  getFood,
  removeFood,
  updateFood,
  getFoodPhanTrang,
} from "../controller/foodController.js";

const footRouter = express.Router();
footRouter.get("/get-food", getFood);
footRouter.post("/create-food", createFood);
footRouter.put("/update-food/:food_id", updateFood);
footRouter.delete("/remove-food/:food_id", removeFood);
// phân trang
footRouter.get("/get-food/phan-trang", getFoodPhanTrang);
export default footRouter;
