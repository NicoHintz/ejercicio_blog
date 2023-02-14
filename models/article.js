const { Sequelize, Model, DataTypes } = require("sequelize");

class Article extends Model {
  static initModel(sequelize) {
    Article.init(
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.BIGINT.UNSIGNED,
        },
        title: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        content: { allowNull: false, type: DataTypes.TEXT },
        image: { allowNull: false, type: DataTypes.BLOB },
      },
      { sequelize, modelName: "article" },
    );
    return Article;
  }
}

module.exports = Article;
