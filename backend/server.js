// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { createServer: createViteServer } = require("vite");
const path = require("path");
const fs = require("fs");
const config = require("./config");
const coordinateRoutes = require("./routes/coordinateRoutes");
const userRoutes = require("./routes/userRoutes");

// 创建 Express 应用
const app = express();
app.use(bodyParser.json());

// 连接 MongoDB 数据库
mongoose
  .connect(config.db)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

// 使用 API 路由
app.use("/users", userRoutes);
app.use("/coordinates", coordinateRoutes);

// 创建 Vite 服务器
async function createServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // 使用 Vite 中间件
  app.use(vite.middlewares);

  // 处理所有其他请求（包括客户端路由）
  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      // 读取 index.html
      const template = fs.readFileSync(
        path.resolve(__dirname, "../frontend/index.html"),
        "utf-8"
      );
      const html = await vite.transformIndexHtml(url, template);

      // 渲染 React 应用
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      console.error(error);
      res.status(500).end(error.message);
    }
  });

  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}

createServer();
