import { sanitizeInput } from '../utils/validators.js';

export const validate = (schema) => (req, res, next) => {
  try {
    // Sanitize input before validation
    const sanitizedData = sanitizeInput(req.body);
    
    const { error } = schema.validate(sanitizedData, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(err => err.message)
      });
    }

    // Replace request body with sanitized and validated data
    req.body = sanitizedData;
    next();
  } catch (err) {
    next(err);
  }
};

export const validateId = (req, res, next) => {
  const id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      error: 'Invalid ID',
      message: 'The provided ID is not valid'
    });
  }
  next();
};
