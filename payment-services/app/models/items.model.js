const { Sequelize } = require("sequelize");

/**
 * @param {Sequelize} sequelizeInstance
 * @returns
 */
module.exports = (sequelizeInstance) => {
  const Items = sequelizeInstance.define("items", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(255),
    },
    description: {
      type: Sequelize.STRING(255),
    },
    price: {
      type: Sequelize.INTEGER,
    },
    total_stock: {
      type: Sequelize.INTEGER,
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
