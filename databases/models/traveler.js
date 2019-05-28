'use strict';
module.exports = (sequelize, DataTypes) => {
  const traveler = sequelize.define('traveler', {
    legion: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {});
  traveler.associate = function(models) {
    // associations can be defined here
  };
  return traveler;
};