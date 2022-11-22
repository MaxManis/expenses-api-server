'use strict';

const express = require('express');
const expensesController = require('./expenses-controller');
const { authMiddleware } = require("../middleware/authMiddleware");
const cookiesParser = require('cookie-parser');

const router = express.Router();

router.use(cookiesParser());

// ======= EXPENSES API:
// GET ALL:
router.get('/', authMiddleware, expensesController.getAllExpenses);

// GET ONE:
router.get('/:expenseId', expensesController.getOneExpense);

// POST ONE:
router.post('/', expensesController.createExpense);

// PATCH ONE:
router.patch('/:expenseId', expensesController.updateExpense);

// DELETE ONE:
router.delete('/:expenseId', expensesController.deleteExpense);

module.exports = router;
