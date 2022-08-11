'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Status, {
        foreignKey: `ProductId`
      })

    }
  }
  Product.init({
    senderName: DataTypes.STRING,
    senderPhone: DataTypes.STRING,
    recipientName: DataTypes.STRING,
    recipientPhone: DataTypes.STRING,
    recipientAddress: DataTypes.STRING,
    recipientCity: DataTypes.INTEGER,
    weightProduct: DataTypes.INTEGER,
    typeProduct: DataTypes.STRING,
    receiptNumber: DataTypes.STRING,
    shipmentPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};