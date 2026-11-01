/* DATABASE DEVELOPER
 * User queries shared by several routes.
 */

import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { eq, sql } from 'drizzle-orm';
import { db, schema } from './index.js';

const { users, memberships } = schema;

export const hashPassword = (password) => bcrypt.hash(password, 10);
export const verifyPassword = (password, hash) => bcrypt.compare(password, hash);
export const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

// Shape returned to clients: never includes password or reset fields
export const publicUser = (user, membership = null) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  title: user.title,
  bio: user.bio,
  specialties: user.specialties,
  image: user.image,
  lastLogin: user.lastLogin,
  createdAt: user.createdAt,
  membership: membership
    ? {
        plan: membership.plan,
        price: membership.price,
        months: membership.months,
        startDate: membership.startDate,
        endDate: membership.endDate,
        paymentStatus: membership.paymentStatus
      }
    : null
});

export const emailEquals = (email) => sql`lower(${users.email}) = lower(${email})`;

export const findUserByEmail = async (email) => {
  const [user] = await db.select().from(users).where(emailEquals(email)).limit(1);
  return user;
};

// User row plus their membership, or undefined
export const getUserWithMembership = async (id) => {
  const [row] = await db
    .select({ user: users, membership: memberships })
    .from(users)
    .leftJoin(memberships, eq(memberships.userId, users.id))
    .where(eq(users.id, id))
    .limit(1);
  return row;
};

export const getPublicUser = async (id) => {
  const row = await getUserWithMembership(id);
  return row && publicUser(row.user, row.membership);
};
