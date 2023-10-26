const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../models");
const crypto = require("crypto");
const Users = db.users;
const Op = db.Sequelize.Op;
const saltRounds = 10;

exports.create = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.password
  ) {
    res.status(400).send({
      message:
        "Parameter not complate! name, email, password and phone was required",
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

  // Save User
  Users.create(usersData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

exports.login = async (req, res) => {
  const users = await Users.findOne({
    where: {
      [Op.or]: [{ email: req.body.username }, { phone: req.body.username }],
    },
    raw: true,
  });
  if (!users) {
    res.status(500).send("User Not Found!");
  }

  const comparePass = await bcrypt.compare(req.body.password, users.password);
  if (comparePass == false) {
    res.status(500).send("Login Failed! Wrong Password.");
  }

  console.log(process.env.SECRET_KEY);
  const combinedData = process.env.SECRET_KEY;
  const authHash = crypto
    .createHash("sha256")
    .update(combinedData)
    .digest("hex");

  res.send({ Authorization: authHash });
};
