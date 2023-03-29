"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Posts", "status", {
      type: Sequelize.ENUM(["pending", "approved"]),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Posts", "status", {
      type: Sequelize.ENUM(["pending", "approved"]),
      allowNull: false,
    });
  },
};
