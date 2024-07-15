import App from '@/app';
import { prismaMock } from '@/testing/prisma';
import request from 'supertest';

const requestBody = {
  email: 'user@mail.com',
};

describe('POST /admin/auth/forgot-password', () => {
  const { app } = new App();

  it('should forgot password success', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
        id: 1,
        fullName: 'mock fullname',
        email: 'mock email',
        password: 'mock password',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      const response = await request(app)
        .post('/api/admin/auth/forgot-password')
        .send(requestBody);
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Email reset password has been sent');
  });

  it('should return error if email not found', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/api/admin/auth/forgot-password')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Invalid email address');
  });
});
