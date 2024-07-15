import App from '@/app';
import { comparePassword } from '@/lib/bcrypt';
import request from 'supertest';
import { prismaMock } from '@/testing/prisma';

const requestBody = {
  email: 'user@mail.com',
  password: 'SecurePassword!',
};

jest.mock('@/lib/bcrypt', () => ({
  comparePassword: jest.fn().mockResolvedValue(true),
}));

describe('POST /admin/auth/login', () => {
  const { app } = new App();

  it('should login successfully', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      id: 1,
      fullName: 'mock fullname',
      email: 'mock email',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post('/api/admin/auth/login')
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login success');
    expect(response.body.data).toBeDefined();
    expect(response.body.token).toBeDefined();
  });

  it('should return error if email not found', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/api/admin/auth/login')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Invalid email address');
  });

  it('should return error if password not match', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      id: 1,
      fullName: 'mock fullname',
      email: 'mock email',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    (comparePassword as jest.Mock).mockResolvedValueOnce(false);
    
    const response = await request(app)
      .post('/api/admin/auth/login')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Incorrect password');
  });
});
