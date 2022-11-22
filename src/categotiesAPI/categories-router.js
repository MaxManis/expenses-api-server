'use strict';

const express = require('express');
const categoriesController = require('./categories-controller');

const router = express.Router();

// ======= CATEGORIES API:
// GET ALL:
router.get('/', categoriesController.getAllCategories);

// GET ONE:
router.get('/:categoryId', categoriesController.getOneCategory);

// POST ONE:
router.post('/', categoriesController.createCategory);

// DELETE ONE:
router.delete('/:categoryId', categoriesController.deleteCategory);

module.exports = router;
