'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.belongsTo(models.City, {
        foreignKey: `CityId`
      })
    }
  }
  Store.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `name can not be empty`
        },
        notNull: {
          msg: `name can not be Null`
        },
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `phone can not be empty`
        },
        notNull: {
          msg: `phone can not be Null`
        },
      }
    },
    CityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `name can not be empty`
        },
        notNull: {
          msg: `name can not be Null`
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};