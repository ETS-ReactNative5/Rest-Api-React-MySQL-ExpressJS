'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('results', [{
      host_id: '1',
      guest_id: '2',
      home_goals: '1',
      away_goals: '0',
      date: '2022-9-03',
      venue: 'Old Trafford'
    }, {
      host_id: '2',
      guest_id: '3',
      home_goals: '1',
      away_goals: '1',
      date: '2022-9-04',
      venue: 'Anfield'
    }, {
      host_id: '3',
      guest_id: '1',
      home_goals: '2',
      away_goals: '1',
      date: '2020-9-03',
      venue: 'Stamford Bridge'
    }, {
      host_id: '4',
      guest_id: '5',
      home_goals: '1',
      away_goals: '2',
      date: '2022-09-13',
      venue: 'White Hart Lane'
    }, {
      host_id: '3',
      guest_id: '5',
      home_goals: '1',
      away_goals: '3',
      date: '2021-5-04',
      venue: 'Stamford Bridge'
    }, {
      host_id: '5',
      guest_id: '1',
      home_goals: '4',
      away_goals: '1',
      date: '2022-6-03',
      venue: 'Etihad'
    }, {
      host_id: '5',
      guest_id: '2',
      home_goals: '2',
      away_goals: '2',
      date: '2020-04-12',
      venue: 'Etihad'
    }, {
      host_id: '2',
      guest_id: '4',
      home_goals: '3',
      away_goals: '1',
      date: '2021-11-01',
      venue: 'Anfield'
    },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('results', null, {});
  }
};
