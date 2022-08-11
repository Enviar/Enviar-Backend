'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `email can not be empty`
        },
        notNull: {
          msg: `email can not be Null`
        },
        isEmail: {
          msg: `email is already registered`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `password can not be empty`
        },
        notNull: {
          msg: `password can not be Null`
        },
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `firstName can not be empty`
        },
        notNull: {
          msg: `firstName can not be Null`
        },
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `lastName can not be empty`
        },
        notNull: {
          msg: `lastName can not be Null`
        },
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `phoneNumber can not be empty`
        },
        notNull: {
          msg: `phoneNumber can not be Null`
        },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `role can not be empty`
        },
        notNull: {
          msg: `role can not be Null`
        },
      }
    },
    StoreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `StoreId can not be empty`
        },
        notNull: {
          msg: `StoreId can not be Null`
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Employee',
    hooks: {
      beforeCreate(instance, options) {
        instance.password = hashPassword(instance.password, 8)
      }
    }
  });
  return Employee;
};