'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_host = sequelize.define('user_host', {
    state: DataTypes.STRING,
    bookDate: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    host_id: DataTypes.INTEGER
  }, {});
  user_host.associate = function(models) {
    // associations can be defined here
  };
  return user_host;
};