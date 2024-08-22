// routes/coordinateRoutes.js

const express = require("express");
const Coordinate = require("../models/Coordinate");

const router = express.Router();

// 添加坐标
router.post("/", async (req, res) => {
  try {
    const { latitude, longitude, description } = req.body;
    const coordinate = new Coordinate({ latitude, longitude, description });
    await coordinate.save();
    res.status(201).json(coordinate);
  } catch (error) {
    res.status(500).json({ error: "添加坐标失败" });
  }
});

// 查询所有坐标
router.get("/", async (req, res) => {
  try {
    const coordinates = await Coordinate.find();
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(500).json({ error: "查询坐标失败" });
  }
});

// 删除坐标
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const coordinate = await Coordinate.findByIdAndDelete(id);
    if (!coordinate) {
      return res.status(404).json({ error: "坐标未找到" });
    }
    res.status(200).json({ message: "坐标已删除" });
  } catch (error) {
    res.status(500).json({ error: "删除坐标失败" });
  }
});

module.exports = router;
