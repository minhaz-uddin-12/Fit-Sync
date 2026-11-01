import { sanitizeInput } from '../utils/validators.js';

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(sanitizeInput(req.body || {}), {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const details = error.details.map(err => err.message.replace(/"/g, ''));
    return res.status(400).json({
      status: 'error',
      message: details[0],
      details
    });
  }

  // Only validated, sanitized fields reach the route handler
  req.body = value;
  next();
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const validateId = (req, res, next) => {
  if (!UUID.test(req.params.id)) {
    return res.status(400).json({
      status: 'error',
      message: 'The provided ID is not valid'
    });
  }
  next();
};
