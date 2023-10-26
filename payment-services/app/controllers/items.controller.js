const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../models");
const { calculateStocks } = require("../utils/utils.js");
const Items = db.items;

exports.findItems = async (req, res) => {
  const checkStock = await calculateStocks("OT-1", "IT-6");
  console.log(checkStock, "cek123123");
  res.send([]);
};
