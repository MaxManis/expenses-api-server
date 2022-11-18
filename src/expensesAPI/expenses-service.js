'use strict';

const { Categories } = require('../models');

const getCategory = async() => {
  try {
    return await Categories.findAll();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};

const createCategory = async(name) => {
  try {
    const newCategory = {
      name,
    };

    await Categories.create(newCategory);

    return newCategory;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};

const updateCategory = async(name, newName) => {
  try {
    const categoryToUpdate = await Categories.findOne({
      where: {
        name,
      },
    });

    categoryToUpdate.name = newName;
    await categoryToUpdate.save();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};

const deleteCategory = async(name) => {
  try {
    const categoryToDelete = await Categories.findOne({
      where: {
        name,
      },
    });

    await categoryToDelete.destroy();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};

module.exports = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
