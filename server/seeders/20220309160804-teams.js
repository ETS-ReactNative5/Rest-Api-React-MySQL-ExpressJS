'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teams', [{
      team_name: 'Man United'
    }, {
      team_name: 'Liverpool'
    }, {
      team_name: 'Chelsea'
    }, {
      team_name: 'Tottenham'
    }, {
      team_name: 'Manchester City'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teams', null, {});
  }
};
