const Task = require('../models/Task');

/**
 * @desc Get all tasks
 * @route GET /api/tasks
 * @access Public
 */
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

/**
 * @desc Create a new task
 * @route POST /api/tasks
 * @access Public
 */
exports.createTask = async (req, res, next) => {
  try {
    const { description } = req.body;
    const newTask = await Task.create({ description });
    res.status(201).json(newTask);
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};
