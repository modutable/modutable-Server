"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "reviews",
      [
        {
          contents: "정말 재미있었습니다. 다음에 또 오고싶네요^^",
          score: 3.5,
          host_id: 2,
          createdAt: "2009-02-02",
          updatedAt: "2009-11-11"
        },
        {
          contents: "정말 재미있었습니다. 다음에 또 오고싶네요^^",
          score: 2.0,
          host_id: 2,
          createdAt: "2009-02-02",
          updatedAt: "2009-11-11"
        },
        {
          contents: "정말 재미있었습니다. 다음에 또 오고싶네요^^",
          score: 4.0,
          host_id: 2,
          createdAt: "2009-02-02",
          updatedAt: "2009-11-11 "
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
