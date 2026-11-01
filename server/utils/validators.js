import Joi from 'joi';

const passwordRule = Joi.string()
  .min(8)
  .max(72) // bcrypt max length
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
  .required()
  .messages({
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character (!@#$%^&*)',
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password cannot exceed 72 characters'
  });

const nameRule = Joi.string().trim().min(2).max(50).required()
  .messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 50 characters'
  });

const emailRule = Joi.string().trim().lowercase().email().required()
  .messages({
    'string.email': 'Please provide a valid email address'
  });

export const userSchema = Joi.object({
  name: nameRule,
  email: emailRule,
  password: passwordRule
});

export const loginSchema = Joi.object({
  email: emailRule,
  password: Joi.string().required().messages({ 'any.required': 'Password is required' })
});

export const privilegedUserSchema = Joi.object({
  name: nameRule,
  email: emailRule,
  password: passwordRule,
  role: Joi.string().valid('admin', 'trainer').required()
    .messages({ 'any.only': 'Role must be either admin or trainer' }),
  title: Joi.string().trim().max(80).allow(''),
  bio: Joi.string().trim().max(500).allow('')
});

export const forgotPasswordSchema = Joi.object({ email: emailRule });

export const resetPasswordSchema = Joi.object({ password: passwordRule });

export const profileSchema = Joi.object({
  name: nameRule.optional(),
  phone: Joi.string().trim().max(20).allow(''),
  bio: Joi.string().trim().max(500).allow(''),
  title: Joi.string().trim().max(80).allow('')
}).min(1);

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: passwordRule
});

export const workoutSchema = Joi.object({
  title: Joi.string().trim().max(100).required(),
  date: Joi.date().max('now').messages({ 'date.max': 'Workout date cannot be in the future' }),
  duration: Joi.number().integer().min(1).max(600).required(),
  calories: Joi.number().integer().min(0).max(10000),
  notes: Joi.string().trim().max(500).allow(''),
  exercises: Joi.array().items(
    Joi.object({
      name: Joi.string().trim().required(),
      sets: Joi.number().integer().min(1).max(100).required(),
      reps: Joi.number().integer().min(1).max(1000).required(),
      weight: Joi.number().min(0).max(1000)
    })
  ).min(1).required().messages({ 'array.min': 'Add at least one exercise' })
});

export const bookingSchema = Joi.object({
  trainerId: Joi.string().guid().required()
    .messages({ 'string.guid': 'Please choose a trainer' }),
  date: Joi.date().greater('now').required()
    .messages({ 'date.greater': 'Please choose a time in the future' }),
  duration: Joi.number().valid(30, 45, 60, 90, 120).required(),
  notes: Joi.string().trim().max(500).allow('')
});

export const bookingStatusSchema = Joi.object({
  status: Joi.string().valid('confirmed', 'cancelled').required()
});

export const membershipSchema = Joi.object({
  plan: Joi.string().valid('Drop-In', 'Unlimited', 'Premium').required()
});

export const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80).required(),
  email: emailRule,
  subject: Joi.string().trim().min(2).max(120).required(),
  message: Joi.string().trim().min(5).max(2000).required()
});

export const roleSchema = Joi.object({
  role: Joi.string().valid('member', 'trainer', 'admin').required()
});

// Strip HTML tags and script-like patterns from every string, recursively
export const sanitizeInput = (data) => {
  if (typeof data === 'string') {
    return data
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  }
  if (Array.isArray(data)) return data.map(sanitizeInput);
  if (data && typeof data === 'object') {
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, sanitizeInput(v)]));
  }
  return data;
};
