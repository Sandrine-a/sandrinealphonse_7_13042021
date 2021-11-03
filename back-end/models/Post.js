'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Liaison avec user
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE'
      });
      models.Post.hasMany(models.Comment)
    }
  };
  Post.init({
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    comments: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: 'Users',
        // This is the column name of the referenced model
        key: 'id',
      }
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};