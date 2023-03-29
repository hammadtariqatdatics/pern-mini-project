"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      // { tableName: "Posts", schema: process.env.SCHEMA_NAME },
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
        },
        content: {
          type: Sequelize.TEXT,
        },
        created: {
          type: Sequelize.DATE,
        },
        status: {
          type: Sequelize.STRING,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Users", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(
      //   {
      //   tableName: "Posts",
      //   schema: process.env.SCHEMA_NAME,
      // }
      "Posts"
    );
  },
};
