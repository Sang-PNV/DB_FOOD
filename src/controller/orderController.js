import sequelize from "../models/index.js";
import initModels from "../models/init-models.js";
import { errorCode, failCode, successCode } from "../config/response.js";

const models = initModels(sequelize);
const postOrder = async (req, res) => {
  console.log(req.body);
  try {
    let { user_id, food_id, amount, code, arr_sub_id } = req.body;
    let userId = await models.user.findOne({ where: { user_id } });
    console.log("userId: ", userId);
    let foodId = await models.food.findOne({ where: { food_id } });
    console.log("foodId: ", foodId);

    if (userId != null && foodId != null) {
      let orderNow = { user_id, food_id, amount, code, arr_sub_id };
      await models.order.create(orderNow);
      successCode(res, orderNow, "Order thành công");
    } else {
      failCode(
        res,
        [{ user_id, food_id }],
        "user_id hoặc food_id không tồn tại"
      );
    }
  } catch (error) {
    errorCode(res, "Lỗi BE");
  }
};
export { postOrder };
