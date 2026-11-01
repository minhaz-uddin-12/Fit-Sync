// Creates the default admin and trainer accounts if they don't exist yet.
// - Development: runs on startup with the demo passwords below.
// - Production: runs from `npm run db:migrate`; accounts are only created
//   when ADMIN_PASSWORD / TRAINER_PASSWORD are set in the environment.

import { db, schema } from '../db/index.js';
import { findUserByEmail, hashPassword } from '../db/users.js';

const { users } = schema;

const DEV_ADMIN_PASSWORD = 'Admin@123';
const DEV_TRAINER_PASSWORD = 'Trainer@123';

const TRAINERS = [
  {
    name: 'Enayet Hossain',
    email: 'enayet@fitness.com',
    title: 'Personal Trainer & Weight Loss Expert',
    bio: 'Fat-loss transformations through high-intensity training and personalized diet plans.',
    specialties: ['Weight Loss', 'HIIT', 'Nutrition'],
    image: '/Enayet.jpg'
  },
  {
    name: 'Reza Khan',
    email: 'reza@fitness.com',
    title: 'Strength & Conditioning Coach',
    bio: 'Powerlifting and functional training for real strength and endurance.',
    specialties: ['Strength', 'Powerlifting', 'Functional'],
    image: '/Reza.jpg'
  },
  {
    name: 'Srishty Das Gupta',
    email: 'srishty@fitness.com',
    title: 'Yoga & Mobility Coach',
    bio: 'Movement and mindfulness for flexibility, posture and injury prevention.',
    specialties: ['Yoga', 'Flexibility', 'Mind-Body'],
    image: '/Srishty.jpg'
  }
];

export const seedDefaults = async ({ production = false } = {}) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@fitsync.com';
  const adminPassword = process.env.ADMIN_PASSWORD || (production ? null : DEV_ADMIN_PASSWORD);
  const trainerPassword = process.env.TRAINER_PASSWORD || (production ? null : DEV_TRAINER_PASSWORD);
  const created = [];

  if (adminPassword && !(await findUserByEmail(adminEmail))) {
    await db.insert(users).values({
      name: 'Admin',
      email: adminEmail,
      role: 'admin',
      passwordHash: await hashPassword(adminPassword)
    });
    created.push(`admin ${adminEmail}${production ? '' : ` / ${adminPassword}`}`);
  }

  if (trainerPassword) {
    const passwordHash = await hashPassword(trainerPassword);
    for (const trainer of TRAINERS) {
      if (!(await findUserByEmail(trainer.email))) {
        await db.insert(users).values({ ...trainer, role: 'trainer', passwordHash });
        created.push(`trainer ${trainer.email}${production ? '' : ` / ${trainerPassword}`}`);
      }
    }
  }

  if (created.length) {
    console.log('🌱 Seeded default accounts:\n   ' + created.join('\n   '));
  } else if (production && !adminPassword) {
    console.log('ℹ️  ADMIN_PASSWORD not set: skipped creating the admin account');
  }
};
