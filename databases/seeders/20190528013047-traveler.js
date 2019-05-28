"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "travelers",
      [
        {
          legion: "서울특별시 송파구",
          startDate: "2009-12-11",
          endDate: "2009-12-30",
          user_id: 1,
          createdAt: "2009-11-11",
          updatedAt: "2009-11-11"
        },
        {
          legion: "서울특별시 잠실본동",
          startDate: "2009-12-11",
          endDate: "2009-12-30",
          user_id: 2,
          createdAt: "2009-11-11",
          updatedAt: "2009-11-11"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
