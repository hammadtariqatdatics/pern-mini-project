"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Posts", "userId", {
      type: Sequelize.INTEGER,
      allowNull: true, // or false, depending on your requirements
      references: {
        model: "Users", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Posts", "userId");
  },
};
