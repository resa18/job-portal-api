const { Sequelize } = require("sequelize");

/**
 * @param {Sequelize} sequelizeInstance
 * @returns
 */
module.exports = (sequelizeInstance) => {
  const Cart = sequelizeInstance.define("carts", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.UUID,
      references: {
        model: {
          tableName: "users",
        },
        key: "id",
      },
      allowNull: false,
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
    },
    status: {
      type: Sequelize.STRING(255),
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
    qty: {
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

  return Cart;
};
