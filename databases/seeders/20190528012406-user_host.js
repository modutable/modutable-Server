"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "user_hosts",
      [
        {
          state: "신청중",
          bookDate: "2009-11-11",
          user_id: 1,
          host_id: 2,
          createdAt: "2009-11-11",
          updatedAt: "2009-11-11"
        },
        {
          state: "승인",
          bookDate: "2009-11-11",
          user_id: 1,
          host_id: 2,
          createdAt: "2009-11-11",
          updatedAt: "2009-11-11"
        },
        {
          state: "신청중",
          bookDate: "2009-11-11",
          user_id: 2,
          host_id: 3,
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
