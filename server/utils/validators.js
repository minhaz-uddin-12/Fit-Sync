import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Please provide a valid email address'
    }),
  password: Joi.string()
    .min(8)
    .max(72) // bcrypt max length
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character (!@#$%^&*)',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 72 characters'
    })
});

export const privilegedUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Please provide a valid email address'
    }),
  password: Joi.string()
    .min(8)
    .max(72)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character (!@#$%^&*)',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 72 characters'
    }),
  role: Joi.string().valid('admin', 'trainer').required()
    .messages({
      'any.only': 'Role must be either admin or trainer'
    })
});

export const workoutSchema = Joi.object({
  title: Joi.string().required(),
  exercises: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      sets: Joi.number().min(1).required(),
      reps: Joi.number().min(1).required()
    })
  ).min(1).required()
});

export const bookingSchema = Joi.object({
  trainerId: Joi.string().required(),
  date: Joi.date().greater('now').required(),
  duration: Joi.number().min(30).max(120).required()
});

// Add additional input sanitization
export const sanitizeInput = (data) => {
  return Object.keys(data).reduce((acc, key) => {
    if (typeof data[key] === 'string') {
      // Remove any HTML tags and suspicious patterns
      acc[key] = data[key]
        .replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .trim();
    } else {
      acc[key] = data[key];
    }
    return acc;
  }, {});
};
