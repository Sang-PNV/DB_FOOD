import Like from "../models/like_res.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/index.js";
import { errorCode, failCode, successCode } from "../config/response.js";

const models = initModels(sequelize);
// xử lý like và unlike
const postLike = async (req, res) => {
  try {
    let { user_id, res_id } = req.body;
    // kiểm tra user_id và res_id có tồn tại không
    let userID = await models.user.findOne({ where: { user_id } });
    let resID = await models.restaurant.findOne({ where: { res_id } });

    if (userID != null && resID != null) {
      let like = await models.like_res.findAll({
        where: { user_id, res_id },
      });
      let newData = { user_id, res_id, date_like: new Date() };
      if (like.length > 0) {
        await models.like_res.destroy({ where: { user_id, res_id } });
        successCode(res, newData, "Unlike");
      } else {
        await models.like_res.create(newData);
        successCode(res, newData, "Like");
      }
    } else {
      failCode(res, [{ res_id, user_id }], "user_id hoặc res_id không tồn tại");
    }
  } catch (error) {
    errorCode(res, "Lỗi BE");
  }
};
// lấy danh sách like theo nhà hàng
const getLikeByRes = async (req, res) => {
  try {
    let { res_id } = req.params;
    let resID = await models.restaurant.findOne({ where: { res_id } });
    if (resID != null) {
      let data = await models.like_res.findAll({
        where: { res_id },
      });
      successCode(res, data, "Lấy dữ liệu thành công");
    } else {
      failCode(res, res_id, "res_id không tồn tại");
    }
  } catch (error) {
    errorCode(res, "Lỗi BE");
  }
};
// lấy danh sách like theo user
const getLikeByUser = async (req, res) => {
  try {
    let { user_id } = req.params;
    let userID = await models.user.findOne({ where: { user_id } });
    if (userID != null) {
      let data = await models.like_res.findAll({
        where: { user_id },
      });
      successCode(res, data, "Lấy dữ liệu thành công");
    } else {
      failCode(res, user_id, "res_id không tồn tại");
    }
  } catch (error) {
    errorCode(res, "Lỗi BE");
  }
};

export { postLike, getLikeByRes, getLikeByUser };
