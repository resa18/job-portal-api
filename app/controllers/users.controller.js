const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../models");
const crypto = require("crypto");
const Users = db.users;
const Op = db.Sequelize.Op;
const saltRounds = 10;

exports.create = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.phone ||
      !req.body.password
    ) {
      res.status(400).send({
        message:
          "Parameters not complete! 'name', 'email', 'password', and 'phone' are required",
      });
      return;
    }

    const hashPass = await bcrypt.hash(req.body.password, saltRounds);

    const usersData = {
      id: uuidv4(),
      name: req.body.name,
      password: hashPass,
      email: req.body.email,
      phone: req.body.phone,
    };

    const data = await Users.create(usersData);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const users = await Users.findOne({
      where: {
        email: req.body.email,
      },
      raw: true,
    });

    if (!users) {
      res.status(404).send("User Not Found!");
      return;
    }

    const comparePass = await bcrypt.compare(req.body.password, users.password);
    if (!comparePass) {
      res.status(401).send("Login Failed! Wrong Password.");
      return;
    }

    const combinedData = process.env.SECRET_KEY;
    const authHash = crypto
      .createHash("sha256")
      .update(combinedData)
      .digest("hex");

    res.send({ Authorization: authHash });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while processing the login request.",
    });
  }
};
