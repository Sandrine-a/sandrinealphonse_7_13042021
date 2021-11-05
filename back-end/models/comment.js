'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE'
      });

      models.Comment.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE'
      })

    }
  };
  Comment.init({
    content: DataTypes.TEXT,
    postId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: 'Posts',
        // This is the column name of the referenced model
        key: 'id',
      }
    },
    userId:  {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: 'Users',
        // This is the column name of the referenced model
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};