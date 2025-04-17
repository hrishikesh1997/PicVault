'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialect: 'postgres',
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: "postgres",
      port: config.port,
      logging: false,
    }
  );
}

// Read all model files and add to db object
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Define associations AFTER loading all models
const { Photo, Tag } = db;
if (Photo && Tag) {
  Photo.hasMany(Tag, { foreignKey: "photoId", onDelete: "CASCADE" });
  Tag.belongsTo(Photo, { foreignKey: "photoId" });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
