'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Categories = sequelize.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'accounting-app-categories',
  updatedAt: false,
  createdAt: false,
});

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.STRING,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activationToken: {
    type: DataTypes.STRING,
    field: 'activation_token',
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'accounting-app-users',
  updatedAt: false,
});

const Expenses = sequelize.define('expenses', {
  id: {
    type: DataTypes.STRING,
    autoIncrement: true,
    primaryKey: true,
  },
  userid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spentat: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'accounting-app-expenses',
  updatedAt: false,
});

module.exports = {
  Users,
  Expenses,
  Categories,
};
