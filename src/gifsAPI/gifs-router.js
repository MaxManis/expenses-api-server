"use strict";

const express = require("express");
const gifController = require("./gifs-controller");

const router = express.Router();

// ======= GIFs API:
// GET ALL:
router.get("/", gifController.getGifBySearch);
router.get("/:gifType", gifController.getGifBySearch);

module.exports = router;
