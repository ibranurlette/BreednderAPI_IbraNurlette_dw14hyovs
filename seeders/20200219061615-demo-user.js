'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users',
       [{
        breder: 'raju',
        email: "raju@gmail.com",
        password: "rajubaju",
        phone: "09349343734",
        addres: "jl belimbing indah",
        level:"admin"
      }],{});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
