const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  async isValidPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
        },
        lastname: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        username: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        roleId: {
          type: DataTypes.TINYINT,
        },
        role: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "user",
        timestamps: false,
      },
    );
    return User;
  }
}

module.exports = User;
