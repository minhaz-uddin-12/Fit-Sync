/* BACKEND DEVELOPER 1
 * Responsible for:
 * - Authentication middleware
 * - Role-based access control
 * - Token verification
 */

import jwt from 'jsonwebtoken';
import { getUserWithMembership, publicUser } from '../db/users.js';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Please log in to continue' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
  } catch (error) {
    const message = error.name === 'TokenExpiredError'
      ? 'Your session has expired. Please log in again.'
      : 'Invalid session. Please log in again.';
    return res.status(401).json({ status: 'error', message });
  }

  // Check the user still exists (and pick up role changes).
  // Tokens issued before the move to PostgreSQL carry a non-UUID id.
  const row = UUID.test(decoded.userId) && await getUserWithMembership(decoded.userId);
  if (!row) {
    return res.status(401).json({ status: 'error', message: 'Your account no longer exists' });
  }

  req.userRow = row.user;
  req.user = publicUser(row.user, row.membership);
  next();
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have permission to do this'
    });
  }
  next();
};
