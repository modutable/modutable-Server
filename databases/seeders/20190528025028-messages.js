"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Peoples",
      [
        {
          sendUser_id: 1,
          getUser_id: 2,
          message: "HI!",
          createdAt: "2009-11-11",
          updatedAt: "2009-11-11"
        },
        {
          sendUser_id: 2,
          getUser_id: 1,
          message: "nice to meet you!",
          createdAt: "2009-11-11",
          updatedAt: "2009-11-11"
        },
        {
          sendUser_id: 1,
          getUser_id: 2,
          message: "me too!!!",
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
