"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.ENUM(["normalUser", "adminUser"]),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "role", {
      type: ENUM(["normalUser", "adminUser"]),
      allowNull: false,
    });
  },
};
