'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Cleaners', 'dateOfBirth', {
      type: Sequelize.DATEONLY, // Assuming you just want the date without the time
      allowNull: true, // Or set to false if every cleaner must have a date of birth
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Cleaners', 'dateOfBirth');
  }
};
