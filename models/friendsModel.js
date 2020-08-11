const { DataTypes } = require("sequelize");
const userDb = require("../config/UserDB");
const userModel = require("./userModel");

const Friend = userDb.define("friend", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "first_name"
  },
  lastName: {
    type: DataTypes.STRING,
    field: "last_name"
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 3,
      max: 30
    }
  },
  gender: {
    type: DataTypes.ENUM,
    values: ["Male", "Female"],
    allowNull: false
  },
  friendId: {
    type: DataTypes.INTEGER,
    field: "friend_id",
    allowNull: false,
    references: {
      model: userModel,
      key: "id"
    }
  }
});

module.exports = Friend;
