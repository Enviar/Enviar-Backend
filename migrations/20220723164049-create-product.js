'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      senderName: {
        type: Sequelize.STRING
      },
      senderPhone: {
        type: Sequelize.STRING
      },
      recipientName: {
        type: Sequelize.STRING
      },
      recipientPhone: {
        type: Sequelize.STRING
      },
      recipientAddress: {
        type: Sequelize.STRING
      },
      recipientCity: {
        type: Sequelize.INTEGER
      },
      weightProduct: {
        type: Sequelize.INTEGER
      },
      typeProduct: {
        type: Sequelize.STRING
      },
      receiptNumber: {
        type: Sequelize.STRING
      },
      shipmentPrice: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Products');
  }
};