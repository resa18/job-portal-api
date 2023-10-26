const { Sequelize } = require("sequelize");

/**
 * @param {Sequelize} sequelizeInstance
 * @returns
 */
module.exports = (sequelizeInstance) => {
  const Outlets = sequelizeInstance.define("outlets", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
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

  return Outlets;
};
