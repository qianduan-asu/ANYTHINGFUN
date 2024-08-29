// routes/userRoutes.js

const express = require("express");
const User = require("../models/User");

const router = express.Router();

// 获取用户信息
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne(browserId);
    if (!user) {
      return res.status(404).json({ error: "用户未找到" });
    }
    res.status(200).json({
      _id: user._id,
      nickname: user.nickname,
      avatar: user.avatar,
      coordinates: user.coordinates,
      onlineSince: user.onlineSince,
    });
  } catch (error) {
    res.status(500).json({ error: "获取用户信息失败" });
  }
});
// 添加用户信息
router.post("/add", async (req, res) => {
  try {
    const { browserId, nickname, avatar, coordinates, onlineSince } = req.body;

    // 检查是否已存在相同的浏览器 ID
    let user = await User.findOne({ browserId });

    if (user) {
      return res.status(400).json({ error: "用户已存在" });
    }

    // 创建新用户
    user = new User({
      browserId,
      nickname,
      avatar,
      coordinates,
      onlineSince: onlineSince ? new Date(onlineSince) : undefined,
    });

    await user.save();

    // 返回新用户信息
    res.status(201).json({
      _id: user._id,
      nickname: user.nickname,
      avatar: user.avatar,
      coordinates: user.coordinates,
      onlineSince: user.onlineSince,
    });
  } catch (error) {
    res.status(500).json({ error: "添加用户信息失败" });
  }
});
// 更新用户信息
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { avatar, coordinates, onlineSince } = req.body;

    // 查找用户并更新信息
    const user = await User.findOne(browserId);
    if (!user) {
      return res.status(404).json({ error: "用户未找到" });
    }

    // 更新用户信息
    if (avatar) user.avatar = avatar;
    if (coordinates) {
      user.coordinates.latitude = coordinates.latitude;
      user.coordinates.longitude = coordinates.longitude;
    }
    if (onlineSince) user.onlineSince = new Date(onlineSince);

    await user.save();

    // 返回更新后的用户信息
    res.status(200).json({
      _id: user._id,
      nickname: user.nickname,
      avatar: user.avatar,
      coordinates: user.coordinates,
      onlineSince: user.onlineSince,
    });
  } catch (error) {
    res.status(500).json({ error: "更新用户信息失败" });
  }
});

module.exports = router;
