"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Posts", "UserId", {
      type: Sequelize.INTEGER,
      allowNull: false, // or false, depending on your requirements
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Posts", "UserId", {
      type: Sequelize.INTEGER,
      allowNull: false, // or false, depending on your requirements
    });
  },
};
