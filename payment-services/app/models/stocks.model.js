const { Sequelize } = require("sequelize");

/**
 * @param {Sequelize} sequelizeInstance
 * @returns
 */
module.exports = (sequelizeInstance) => {
  const Stock = sequelizeInstance.define("stocks", {
    warehouse_id: {
      type: Sequelize.UUID,
      references: {
        model: {
          tableName: "warehouses",
        },
        key: "id",
      },
      allowNull: false,
    },
    item_id: {
      type: Sequelize.UUID,
      references: {
        model: {
          tableName: "items",
        },
        key: "id",
      },
      allowNull: false,
    },
    total_stock: {
      type: Sequelize.INTEGER,
    },
  });

  return Stock;
};
