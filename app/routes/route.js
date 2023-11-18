module.exports = (app) => {
  const users = require("../controllers/users.controller.js");
  const news = require("../controllers/news.controller.js");

  const authMiddleware = require("./middleware.js");
  var router = require("express").Router();

  //user
  router.post("/create-user", users.create);
  router.post("/login", users.login);

  router.get("/getJobs", authMiddleware, news.getNews);
  router.get("/getDetailJobs", authMiddleware, news.getDetailNews);

  app.use("/api", router);
};
