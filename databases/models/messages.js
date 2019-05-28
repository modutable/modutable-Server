'use strict';
module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define('messages', {
    sendUser_id: DataTypes.INTEGER,
    getUser_id: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {});
  messages.associate = function(models) {
    // associations can be defined here
  };
  return messages;
};