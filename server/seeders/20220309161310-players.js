'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('players', [{
      teamId: '1',
      name: 'Ronaldo',
      position: 'Central Forward',
      age: '37'
    }, {
      teamId: '1',
      name: 'Varane',
      position: 'Central Back',
      age: '29'
    }, {
      teamId: '2',
      name: 'M. Salah',
      position: 'Wing',
      age: '31'
    }, {
      teamId: '2',
      name: 'Henderson',
      position: 'Central Middfielder',
      age: '32'
    }, {
      teamId: '3',
      name: 'Lukaku',
      position: 'Central Forward',
      age: '29'
    }, {
      teamId: '3',
      name: 'Kante',
      position: 'Defensive Middfielder',
      age: '30'
    }, {
      teamId: '4',
      name: 'Kane',
      position: 'Attacker',
      age: '29'
    }, {
      teamId: '4',
      name: 'Hugo Lloris',
      position: 'Goalkeeper',
      age: '33'
    }, {
      teamId: '5',
      name: 'Phil Foden',
      position: 'Middfielder',
      age: '22'
    }, {
      teamId: '5',
      name: 'Ederson',
      position: 'Goalkeeper',
      age: '31'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('players', null, {});
  }
};
