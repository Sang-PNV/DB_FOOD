import initModels from "../models/init-models.js";
import sequelize from "../models/index.js";
import Rate from "../models/rate_res.js";
import { errorCode, failCode, successCode } from "../config/response.js";

const models = initModels(sequelize);

// Thêm đánh giá
const postRate = async (req, res) => {
  try {
    let { user_id, res_id, amount } = req.body;
    // kiểm tra user_id và res_id có tồn tại không
    let userID = await models.user.findOne({ where: { user_id } });
    let resID = await models.restaurant.findOne({ where: { res_id } });
    if (userID != null && resID != null) {
      let rate = await models.rate_res.findAll({
        where: { user_id, res_id },
      });
      let newData = { user_id, res_id, amount, date_rate: new Date() };
      if (rate.length > 0) {
        await models.rate_res.update(newData, { where: { user_id, res_id } });
        successCode(res, newData, "Đã rate lại");
      } else {
        await models.rate_res.create(newData);
        successCode(res, newData, "Đã rate");
      }
    } else {
      failCode(res, [res_id, user_id], "user_id hoặc res_id không tồn tại");
    }
  } catch (error) {
    errorCode(res, "Lỗi BE");
  }
};

// Lấy danh sách đánh giá theo nhà hàng
const getRateByRes = async (req, res) => {
  try {
    let { res_id } = req.params;
    let resId = await models.restaurant.findOne({ where: { res_id } });
    if (resId != null) {
      let data = await models.rate_res.findAll({ where: { res_id } });
      successCode(res, data, "Lấy dữ liệu thành công");
    } else {
      failCode(res, res_id, "res_id không tồn tại");
    }
  } catch (error) {
    errorCode(res, "Lỗi BE");
  }
};
// Lây danh sách đánh giá theo user
const getRateByUser = async (req, res) => {
  try {
    let { user_id } = req.params;
    let userId = await models.user.findOne({ where: { user_id } });
    if (userId != null) {
      let data = await models.rate_res.findAll({ where: { user_id } });
      successCode(res, data, "Lấy dữ thành công");
    } else {
      failCode(res, user_id, "user_id không tồn tại");
    }
  } catch (error) {
    errorCode(res, "Lỗi BE");
  }
};

export { postRate, getRateByRes, getRateByUser };
