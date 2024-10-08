const { Sequelize, DataTypes, sequelize, Op } = require('sequelize');
const connection = require('../DataLayer/connectionWithSingleton');

const models = {
    sequelize: connection,
    Utils: {
      Op,
      sequelize,
    },
  };
  
  module.exports = models;