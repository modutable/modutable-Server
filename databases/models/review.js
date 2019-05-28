"use strict";
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define(
    "review",
    {
      contents: DataTypes.TEXT,
      score: DataTypes.DOUBLE,
      host_id: DataTypes.INTEGER
    },
    {}
  );
  review.associate = function(models) {
    // associations can be defined here
  };
  return review;
};
