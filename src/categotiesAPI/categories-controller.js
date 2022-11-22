'use strict';

// Imports:
const { Users, Categories} = require('../models');

const getAllCategories = async(request, response) => {
    try {
        const params = request.query;
        const qweryDBsettings = {
            order: [
                ['id', 'ASC'],
            ],
        };

        if (params.userid) {
            qweryDBsettings.where = {
                userid: +params.userid,
            };
        }

        const categoriesFromDB = await Categories.findAll(qweryDBsettings);

        response.statusCode = 200;
        response.json(categoriesFromDB);
    } catch (e) {
        console.log(e)
        response.sendStatus(500);
    }
};

const getOneCategory = async(request, response) => {
    const { categoryId } = request.params;

    try {
        const categoryFromDB = await Categories.findOne({
            where: {
                id: +categoryId,
            },
        });

        if (!categoryFromDB) {
            response.sendStatus(404);

            return;
        }

        response.statusCode = 200;
        response.json(categoryFromDB);
    } catch (e) {
        response.sendStatus(500);
    }
};

const createCategory = async(req, res) => {
    try {
        const newData = req.body;
        const currentUser = await Users.findOne({
            where: {
                id: +newData.userid,
            },
        });

        if (!newData.name || !currentUser) {
            res.sendStatus(400);

            return;
        }

        const newCategory = await Categories.create(newData);

        res.statusCode = 201;
        res.json(newCategory);
    } catch (e) {
        res.sendStatus(500);
    }
};

const deleteCategory = async(req, res) => {
    const { categoryId } = req.params;

    try {
        const categoryFromDB = await Categories.findOne({
            where: {
                id: +categoryId,
            },
        });

        if (!categoryFromDB) {
            res.sendStatus(404);

            return;
        }

        categoryFromDB.destroy();

        res.sendStatus(204);
    } catch (e) {
        res.sendStatus(500);
    }
};

module.exports = {
    getAllCategories,
    getOneCategory,
    createCategory,
    deleteCategory,
};
