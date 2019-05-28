"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "hosts",
      [
        {
          phone: "010-5523-4554",
          address: "서울특별시 송파구 가락동",
          openDate: "2009-04-11",
          closeDate: "2009-04-30",
          guestMin: 5,
          guestMax: 10,
          title: "음악을 좋아하는 사람들의 모임",
          description: "즐거운 저녁을 함께할 사람듣을 모아봅니다.",
          deadline: "2009-04-30",
          user_id: 2,
          createdAt: "2009-11-11",
          updatedAt: "2009-11-11"
        },
        {
          phone: "010-2323-442",
          address: "서울특별시 송파구 가락동",
          openDate: "2009-04-11",
          closeDate: "2009-04-30",
          guestMin: 5,
          guestMax: 10,
          title: "쿠키를 구워먹어보자",
          description: "쿠키가 맛나니까 같이 구워봅시다.",
          deadline: "2009-04-30",
          user_id: 3,
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
