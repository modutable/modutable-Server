'use strict';
module.exports = (sequelize, DataTypes) => {
  const host = sequelize.define('host', {
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    openDate: DataTypes.DATE,
    closeDate: DataTypes.DATE,
    guestMin: DataTypes.INTEGER,
    guestMax: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    deadline: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {});
  host.associate = function(models) {
    // associations can be defined here
  };
  return host;
};