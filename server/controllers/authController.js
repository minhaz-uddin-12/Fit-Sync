import crypto from 'crypto';
import User from '../models/User.js';
import { sendVerificationEmail } from '../utils/email.js';

export const verifyEmail = async (req, res) => {
  try {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          verificationToken,
          verificationExpires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        }
      }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await sendVerificationEmail(user.email, verificationToken);
    res.json({ message: 'Verification email sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
