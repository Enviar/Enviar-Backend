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
    senderName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Sender Name can not be empty`
        },
        notNull: {
          msg: `Sender Name can not be Null`
        },
      }
    },
    senderPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Sender Phone can not be empty`
        },
        notNull: {
          msg: `Sender Phone can not be Null`
        },
      }
    },
    recipientName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Recipient can not be empty`
        },
        notNull: {
          msg: `Recipient can not be Null`
        },
      }
    },
    recipientPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Recipient Phone can not be empty`
        },
        notNull: {
          msg: `Recipient Phone can not be Null`
        },
      }
    },
    recipientAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Recipient Address can not be empty`
        },
        notNull: {
          msg: `Recipient Address can not be Null`
        },
      }
    },
    recipientCity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `name can not be empty`
        },
        notNull: {
          msg: `name can not be Null`
        },
      }
    },
    weightProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        notEmpty: {
          msg: `Weight Product can not be empty`
        },
        notNull: {
          msg: `Weight Product can not be Null`
        },
      }
    },
    typeProduct: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: {
          msg: `Product Type can not be empty`
        },
        notNull: {
          msg: `Product Type can not be Null`
        },
      }
    },
    typeService: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notEmpty: {
      //     msg: `Service Type can not be empty`
      //   },
      //   notNull: {
      //     msg: `Service Type can not be Null`
      //   },
      // }
    },
    receiptNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Receipt Number can not be empty`
        },
        notNull: {
          msg: `Receipt Number can not be Null`
        },
      }
    },
    shipmentPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Price can not be empty`
        },
        notNull: {
          msg: `Price can not be Null`
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};