import { JWT_SECRET, NEXT_BASE_URL } from '@/config';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

export const forgotPasswordService = async (body: Pick<User, 'email'>) => {
  try {
    const { email } = body;

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      throw new Error('Invalid email address');
    }

    const token = sign({ id: user.id }, JWT_SECRET, { expiresIn: '30m' });

    const link = NEXT_BASE_URL + `/reset-password?token=${token}`;

    await transporter.sendMail({
      from: 'Admin',
      to: email,
      subject: 'Link Reset Password',
      html: `<a href="${link}" target="_blank"> Reset Password Here</a>`,
    });

    return {
      message: 'Email reset password has been sent',
    };
  } catch (error) {
    throw error;
  }
};
