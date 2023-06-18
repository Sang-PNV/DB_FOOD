import Food from "../models/food.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/index.js";

const models = initModels(sequelize);
const getFood = async (req, res) => {
  try {
    let data = await models.food.findAll({
      include: ["type"],
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Lỗi BE");
  }
};

const createFood = async (req, res) => {
  try {
    let { food_name, image, price, desc, type_id } = req.body;
    let newData = {
      food_name,
      image,
      price,
      desc,
      type_id,
    };
    await models.food.create(newData);
    res.status(201).send("Thêm food thành công");
  } catch (error) {}
};

const updateFood = async (req, res) => {
  try {
    let { food_id } = req.params;
    let { food_name, image, price, desc, type_id } = req.body;

    let newData = { food_name, image, price, desc, type_id };
    let checkId = await models.food.findOne({ where: { food_id } });
    if (checkId) {
      await models.food.update(newData, { where: { food_id } });
      res.status(200).send("update food thành công");
    } else {
      res.status(404).send("Id không tồn tại");
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send("Lỗi BE");
  }
};

const removeFood = async (req, res) => {
  try {
    let { food_id } = req.params;
    let checkId = await models.food.findOne({ where: { food_id } });
    if (checkId) {
      await models.food.destroy({ where: { food_id } });
      res.status(200).send("remove food thành công");
    } else {
      res.status(404).send("Id không tồn tại");
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send("Lỗi BE");
  }
};
// phân trang
const getFoodPhanTrang = async (req, res) => {
  try {
    let { page, pageSize } = req.body;
    let index = (page - 1) * pageSize;
    let data = await models.food.findAll({
      offset: index,
      limit: pageSize,
    });
    res.status(200).send(data);
  } catch (error) {}
};

export { getFood, createFood, updateFood, removeFood, getFoodPhanTrang };
