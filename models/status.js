'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Status.belongsTo(models.City, {
        foreignKey: `CityId`
      })
      Status.belongsTo(models.Employee, {
        foreignKey: `EmployeeId`
      })
      Status.belongsTo(models.Product, {
        foreignKey: `ProductId`
      })
    }
  }
  Status.init({
    EmployeeId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,

      validate: {
        notEmpty: {
          msg: `Notes can not be empty`
        },
        notNull: {
          msg: `Notes can not be Null`
        },
      }
    },
    CityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};