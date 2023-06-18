import { where } from "sequelize";
import initModels from "../models/init-models.js";
import sequelize from "../models/index.js";

const models = initModels(sequelize);
const getUser = async (req, res) => {
  try {
    let data = await models.user.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (req, res) => {
  try {
    let { user_id, full_name, email, pass_word } = req.body;
    let newData = {
      full_name,
      email,
      pass_word,
    };
    await models.user.create(newData);
    res.status(201).send("Create user success");
  } catch (error) {
    re;
  }
};

const updateUser = async (req, res) => {
  try {
    let { user_id } = req.params;
    let { full_name, email, pass_word } = req.body;
    let newData = {
      full_name,
      email,
      pass_word,
    };
    let checkId = await models.user.findOne({ where: { user_id } });
    if (checkId) {
      await models.user.update(newData, { where: { user_id } });
      res.status(200).send("Update thành công");
    } else {
      res.status(404).send("ID không tồn tại");
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send("Lỗi BE");
  }
};

const deleteUser = async (req, res) => {
  try {
    let { user_id } = req.params;
    let checkId = await models.user.findOne({ where: { user_id } });
    if (checkId) {
      await models.user.destroy({ where: { user_id } });
      res.status(200).send("Xóa thành công");
    } else {
      res.status(404).send("Id không tồn tại");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi BE");
  }
};
export { getUser, createUser, updateUser, deleteUser };
