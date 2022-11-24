'use strict';

// Imports:
const { Users } = require('../models');
const { v4: uuidv4 } = require('uuid')
const { sendUserActivationLink } = require("../services/emailService");
const userServices = require('./users-services');
const jwtService = require('../services/jwtService');
const bcrypt = require('bcrypt');
require("dotenv/config");

// Functions names below describes well what does it do :)
async function userRegistration(request, response) {
  try {
    const { name, email, password } = request.body;

    if (await userServices.getByEmail(email)) {
      response.sendStatus(409);

      return;
    }

    const hash = await bcrypt.hash(password, 10);
    const activationToken = uuidv4();
    const newUser = await Users.create({
      name,
      email,
      password: hash,
      activationToken,
    });

    await sendUserActivationLink(email, activationToken);

    response.statusCode = 201;
    response.send(newUser);
  } catch (e) {
    console.log(e);
    response.sendStatus(500);
  }
}

async function userActivation(request, response) {
  try {
    const { token } = request.params;
    const currentUser = await Users.findOne({
      where: {
        activationToken: token,
      }
    });

    if (!currentUser) {
      response.sendStatus(404);
    }

    currentUser.set({
      activationToken: null,
    });
    await currentUser.save();

    response.statusCode = 200;
    response.send(currentUser);
  } catch (e) {
    response.sendStatus(500);
  }
}

async function userLogin(request, response) {
  try {
    const { email, password } = request.body;
    const currentUser = await userServices.getByEmail(email);
    const isPasswordCorrect = await bcrypt.compare(password, currentUser.password);

    if (!currentUser || !isPasswordCorrect) {
      response.sendStatus(401);

      return;
    }

    const userData = userServices.normalize(currentUser);
    const accessToken = jwtService.generateAccessToken(userData);

    response.cookie('token', accessToken, {
      maxAge: 1000 * 60 * 60,
      sameSite: 'none',
      secure: true,
    });

    response.statusCode = 200;
    response.send(userData);
  } catch (e) {
    response.sendStatus(500);
  }
}

async function userLogout(request, response) {
  try {
    response.clearCookie('token');
    response.statusCode = 200;
    response.send({ logout: 'done' });
  } catch (e) {
    response.sendStatus(500);
  }
}

async function getAllUsers(request, response) {
  try {
    const usersFromDB = await Users.findAll({
      order: [
        ['id', 'ASC'],
      ],
    });

    response.statusCode = 200;
    response.json(usersFromDB);
  } catch (e) {
    response.sendStatus(500);
  }
}

async function getOneUsers(request, response) {
  const { userID } = request.params;

  try {
    const userFromDB = await Users.findAll({
      where: {
        id: userID,
      },
    });

    if (!userFromDB) {
      response.sendStatus(404);

      return;
    }

    response.statusCode = 200;
    response.json(userFromDB);
  } catch (e) {
    response.sendStatus(500);
  }
}

async function createOneUser(req, res) {
  try {
    const newData = req.body;

    if (!newData.name) {
      res.sendStatus(400);

      return;
    }

    await Users.create({
      name: newData.name,
    });

    res.statusCode = 201;
    res.json(newData);
  } catch (e) {
    res.sendStatus(500);
  }
}

async function updateUser(req, res) {
  const { userID } = req.params;

  try {
    const userToUpdate = await Users.findOne({
      where: {
        id: userID,
      },
    });
    const newName = req.body.name;

    if (!userToUpdate || !newName) {
      res.sendStatus(400);

      return;
    }

    userToUpdate.set({ name: newName });
    await userToUpdate.save();

    res.statusCode = 200;
    res.json(userToUpdate);
  } catch (e) {
    res.sendStatus(500);
  }
}

async function deleteUser(req, res) {
  const { userID } = req.params;

  try {
    const userToDelete = await Users.findOne({
      where: {
        id: userID,
      },
    });

    if (!userToDelete) {
      res.sendStatus(404);

      return null;
    }

    userToDelete.destroy();

    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(500);
  }
}

module.exports = {
  getAllUsers,
  getOneUsers,
  createOneUser,
  updateUser,
  deleteUser,
  userRegistration,
  userActivation,
  userLogin,
  userLogout,
};
