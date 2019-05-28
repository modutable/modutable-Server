"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "John",
          lastName: "inyong",
          address: "서울특별시 송파구 가락동",
          email: "jiy8319@gmail.com",
          password: "1q2w3e4r!",
          birthday: "1993-02-26",
          createdAt: "2009-01-11",
          updatedAt: "2009-02-11"
        },
        {
          firstName: "lock",
          lastName: "jinhyuk",
          address: "대구 광역시 오연동",
          email: "gogoJH@gmail.com",
          password: "1q2w3e4r!",
          birthday: "1980-06-16",
          createdAt: "2009-01-11",
          updatedAt: "2009-02-11"
        },
        {
          firstName: "aim",
          lastName: "sujong",
          address: "서울특별시 동구 아차산로",
          email: "jiy8332@gmail.com",
          password: "1q2w3e4r!",
          birthday: "1953-12-10",
          createdAt: "2009-01-11",
          updatedAt: "2009-02-11"
        },
        {
          firstName: "test",
          lastName: "lastName",
          address: "서울특별시 종로구",
          email: "jiy8332@gmail.com",
          password: "1q2w3e4r!",
          birthday: "1953-12-10",
          createdAt: "2009-01-11",
          updatedAt: "2009-02-11"
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
