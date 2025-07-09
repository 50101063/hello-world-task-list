const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');
const { createTaskSchema } = require('../middlewares/validation');

/**
 * @route GET /api/tasks
 * @desc Get all tasks
 * @access Public
 */
router.get('/tasks', taskController.getAllTasks);

/**
 * @route POST /api/tasks
 * @desc Create a new task
 * @access Public
 */
router.post('/tasks', createTaskSchema, taskController.createTask);

module.exports = router;
