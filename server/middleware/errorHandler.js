export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.name, err.message);
  console.error('Stack:', err.stack);

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      error: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message)
    });
  }

  // Authentication errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ 
      status: 'error',
      error: 'Authentication Error',
      message: err.name === 'TokenExpiredError' ? 'Token has expired' : 'Invalid token'
    });
  }

  // Duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      status: 'error',
      error: 'Duplicate Error',
      message: `${field} already exists`
    });
  }

  // Database connection errors
  if (err.name === 'MongoTimeoutError' || err.message.includes('timed out')) {
    return res.status(503).json({
      status: 'error',
      error: 'Service Unavailable',
      message: 'Database operation timed out. Please try again in a few moments.'
    });
  }

  // Server errors
  if (err.name === 'MongoServerError') {
    return res.status(503).json({
      status: 'error',
      error: 'Database Error',
      message: 'Database operation failed. Please try again later.'
    });
  }

  // Cast errors (invalid IDs etc)
  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'error',
      error: 'Invalid Data',
      message: `Invalid ${err.path}: ${err.value}`
    });
  }

  // Default error
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};
