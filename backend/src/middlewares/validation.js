const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return next(error); // Pass the Joi error to the error handler
  }
  next();
};

// Schema for creating a new task
const createTaskSchema = Joi.object({
  description: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Task description cannot be empty',
    'string.min': 'Task description must not be empty',
    'any.required': 'Task description is required'
  })
});

module.exports = {
  createTaskSchema: validate(createTaskSchema)
};
