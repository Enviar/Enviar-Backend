'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Statuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      EmployeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Employees`,
          key: `id`
        }
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Products`,
          key: `id`
        }
      },
      notes: {
        type: Sequelize.TEXT
      },
      CityId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Cities`,
          key: `id`
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Statuses');
  }
};