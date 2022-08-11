'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      City.hasMany(models.Store, {
        foreignKey: `CityId`
      })
    }
  }
  City.init({
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
    }
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};