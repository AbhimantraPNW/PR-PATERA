import App from '@/app';
import { hashPassword } from '@/lib/bcrypt';
import request from 'supertest';
import { prismaMock } from '../prisma';
import { verifyToken } from '@/lib/jwt';

const requestBody = {
  userId: 1,
  newPassword: 'NewSecurePassword!',
};

jest.mock('@/lib/bcrypt', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashedPassword!'),
}));

jest.mock('@/lib/jwt', () => ({
  verifyToken: jest.fn(),
}));

describe('PATCH /admin/auth/reset-password', () => {
  const { app } = new App();

  it('should reset password successfully', async () => {
    const mockToken = 'mockToken';
    const mockPayload = { id: 1 };

    (verifyToken as jest.Mock).mockImplementation((req, res, next) => {
      req.body.user = mockPayload;
      next();
    });

    prismaMock.user.findFirst.mockResolvedValueOnce({
      id: 1,
      fullName: 'mock fullname',
      email: 'mock email',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    (hashPassword as jest.Mock).mockResolvedValueOnce('hashedPassword!');

    prismaMock.user.update.mockResolvedValueOnce({
      id: 1,
      fullName: 'mock fullname',
      email: 'mock email',
      password: 'hashedPassword!',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .patch('/api/admin/auth/reset-password')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Reset password success');
  });

  it('should return error if user not found', async () => {
    const mockToken = 'mockToken';
    const mockPayload = { id: 1 };
    
    (verifyToken as jest.Mock).mockImplementation((req, res, next) => {
      req.body.user = mockPayload;
      next();
    });

    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    const response = await request(app)
      .patch('/api/admin/auth/reset-password')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Account not found');
  });
});
