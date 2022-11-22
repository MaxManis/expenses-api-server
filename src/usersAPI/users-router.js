'use strict';

const express = require('express');
const usersController = require('./users-controller');

const router = express.Router();

// ======= USERS API:
// GET ALL:
router.get('/', usersController.getAllUsers);

// GET ONE:
// router.get('/:userID', usersController.getOneUsers);

// POST ONE:
router.post('/', usersController.createOneUser);

// PATCH ONE:
router.patch('/:userID', usersController.updateUser);

// DELETE ONE:
router.delete('/:userID', usersController.deleteUser);

// User registration:
router.post('/registration', usersController.userRegistration);

// User activation:
router.get('/activation/:token', usersController.userActivation);

// User login:
router.post('/login', usersController.userLogin);

// User logout:
router.get('/logout', usersController.userLogout);

module.exports = router;
