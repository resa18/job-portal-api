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
      primaryKey: true,
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
      primaryKey: true,
    },
    total_stock: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      field: "updated_at",
    },
  });

  return Stock;
};
