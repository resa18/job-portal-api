const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../models");
const crypto = require("crypto");
const Warehouses = db.warehouses;
const Stocks = db.stocks;
const Sequelize = db.Sequelize;
const Op = db.Sequelize.Op;
const saltRounds = 10;

exports.update = async (req, res) => {
  const id = req.params.id;
  // Save User
  Warehouses.update(req.body, {
    where: { id: id },
  })
    .then((data) => {
      console.log(data);
      if (data == 1) {
        res.send({
          message: "Warehouse was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Warehouse with id=${id}. Maybe Warehouse was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Warehouse with id=" + id,
      });
    });
};

exports.transferItem = async (req, res) => {
  try {
    const warehouseSource = req.body.wh_source;
    const warehouseDestination = req.body.wh_dest;
    const itemId = req.body.item_id;
    const qtyTransfer = req.body.qty;

    const checkStokSource = await Stocks.findOne({
      where: {
        warehouse_id: warehouseSource,
        item_id: itemId,
      },
      attributes: ["warehouse_id", "item_id", "total_stock"],
      raw: true,
    });
    if (checkStokSource.total_stock < qtyTransfer) {
      res.status(500).send({
        message: "Quantitiy on warehouse source is not enough to transfer",
      });
      return;
    }

    const checkDest = await Stocks.findOne({
      where: {
        warehouse_id: warehouseDestination,
        item_id: itemId,
      },
      attributes: ["warehouse_id", "item_id", "total_stock"],
      raw: true,
    });

    if (checkDest) {
      await Stocks.update(
        {
          total_stock: Sequelize.literal(`total_stock + ${qtyTransfer}`),
        },
        {
          where: {
            warehouse_id: warehouseDestination,
            item_id: itemId,
          },
        }
      );
    } else {
      await Stocks.create({
        warehouse_id: warehouseDestination,
        item_id: itemId,
        total_stock: qtyTransfer,
      });
    }
    await Stocks.update(
      {
        total_stock: Sequelize.literal(`total_stock - ${qtyTransfer}`),
      },
      {
        where: {
          warehouse_id: warehouseSource,
          item_id: itemId,
        },
      }
    );
    res.send({
      message: "Transfer Success",
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while adding item to cart.",
    });
    return;
  }
};
