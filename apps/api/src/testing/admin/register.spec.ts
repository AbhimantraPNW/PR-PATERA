import App from '@/app';
import request from 'supertest';
import { prismaMock } from '../prisma';

const requestBody = {
  fullName: 'fullName',
  email: 'user@mail.com',
  password: 'SecurePassword!',
};

describe('POST /admin/auth/register', () => {
  const { app } = new App();

  it('should register user successfully', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);
    prismaMock.user.create.mockResolvedValueOnce({
      id: 1,
      fullName: 'mock fullname',
      email: 'mock email',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post('/api/admin/auth/register')
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Register success');
    expect(response.body.data).toBeDefined()
  });

  it('should return error if email already exist', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      id: 1,
      fullName: 'mock fullname',
      email: 'mock email',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const response = await request(app)
      .post('/api/admin/auth/register')
      .send(requestBody);

      expect(response.status).toBe(500);
      expect(response.text).toBe('Email already exist');
  });
});
