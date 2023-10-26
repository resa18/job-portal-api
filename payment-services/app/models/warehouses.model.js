const { Sequelize } = require("sequelize");

/**
 * @param {Sequelize} sequelizeInstance
 * @returns
 */
module.exports = (sequelizeInstance) => {
  const Warehouse = sequelizeInstance.define("warehouses", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(255),
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
    is_active: {
      type: Sequelize.BOOLEAN,
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

  return Warehouse;
};
