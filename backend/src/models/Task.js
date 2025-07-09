const knex = require('../utils/db');

class Task {
  static async findAll() {
    return knex('tasks').select('*').orderBy('created_at', 'asc');
  }

  static async create(task) {
    const [newTask] = await knex('tasks').insert(task).returning('*');
    return newTask;
  }
}

module.exports = Task;
