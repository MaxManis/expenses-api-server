"use strict";

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const routerUsers = require("./usersAPI/users-router");
const routerExpenses = require("./expensesAPI/expenses-router");
const routerCategories = require("./categotiesAPI/categories-router");
const routerGifs = require("./gifsAPI/gifs-router");
const cookieParser = require("cookie-parser");
const { authMiddleware } = require("./middleware/authMiddleware");
require("dotenv/config");

// Port:
const PORT = process.env.PORT || 8000;

function createServer() {
  // Paths:
  const publicDirPath = path.join(__dirname, "public");
  // App setup:
  const app = express();

  // Middleware:
  app.use(express.json());
  app.use(
    cors({
      origin: [
        process.env.CLIENT_ORIGIN_URL_dev,
        process.env.CLIENT_ORIGIN_URL_prod,
      ],
      credentials: true,
    })
  );
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

  // ======= API Home page:
  app.get("/", (req, res) => {
    const indexHTMLPath = path.join(publicDirPath, "index.html");
    res.setHeader("Content-Type", "text/html");

    res.end(fs.readFileSync(indexHTMLPath));
  });

  // ======= USERS API:
  app.use("/users", routerUsers);

  // ======= CATEGORIES API:
  app.use("/categories", routerCategories);

  // ======= EXPENSES API:
  app.use("/expenses", routerExpenses);

  // ======= GIFs API:
  app.use("/gifs", routerGifs);
  return app;
}

// Server init:
createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log("running on http://localhost:" + PORT);
});

module.exports = {
  createServer,
};
