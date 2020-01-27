'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('MedicineLaboratory', ['laboratoryId', 'medicineId'], {
      type: 'unique',
      name: 'ak_medicine_laboratory'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('MedicineLaboratory', 'ak_medicine_laboratory');
  },
};
