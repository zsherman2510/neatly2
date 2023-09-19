'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cleaner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cleaner.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    cleaningExperience: DataTypes.INTEGER,
    cleaningSpecialty: DataTypes.STRING,
    daysAvailable: DataTypes.STRING,
    hourlyRate: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Cleaner',
  });
  return Cleaner;
};