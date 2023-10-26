const { Sequelize } = require("sequelize");

/**
 * @param {Sequelize} sequelizeInstance
 * @returns
 */
module.exports = (sequelizeInstance) => {
  const Items = sequelizeInstance.define("detail_transactions", {
    transaction_id: {
      type: Sequelize.UUID,
      references: {
        model: {
          tableName: "transaction",
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
    outlet_id: {
      type: Sequelize.UUID,
      references: {
        model: {
          tableName: "outlets",
        },
        key: "id",
      },
      allowNull: false,
      primaryKey: true,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    qty: {
      type: Sequelize.INTEGER,
    },
    sub_total: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING(255),
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

  return Items;
};
