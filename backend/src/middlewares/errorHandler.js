const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging

  // Default error status and message
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Handle Joi validation errors specifically
  if (err.isJoi) {
    statusCode = 400; // Bad Request
    message = err.details.map(detail => detail.message).join(', ');
  } else if (err.name === 'Error' && err.message.includes('duplicate key')) {
    // Example for unique constraint violation (though not applicable for tasks table with UUID)
    statusCode = 409; // Conflict
    message = 'Resource already exists or conflicts with existing data.';
  }
  // Add more specific error handling for database errors, etc. if needed

  res.status(statusCode).json({
    success: false,
    error: message
  });
};

module.exports = errorHandler;
