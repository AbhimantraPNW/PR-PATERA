import App from '@/app';
import request from 'supertest';
import { prismaMock } from '../prisma';
import { verifyToken } from '@/lib/jwt';

const requestBody = {
  userId: 1,
};

jest.mock('@/lib/jwt', () => ({
  verifyToken: jest.fn(),
}));

describe('GET /admin/auth/keep-login', () => {
  const { app } = new App();

  it('should keep login successfully', async () => {
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

    const response = await request(app)
      .get('/api/admin/auth/keep-login')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Keep login success');
    expect(response.body.user)
  })

  it('should return error if user not found', async () => {
    const mockToken = 'mockToken';
    const mockPayload = { id: 1 };
    
    (verifyToken as jest.Mock).mockImplementation((req, res, next) => {
      req.body.user = mockPayload;
      next();
    });

    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    const response = await request(app)
      .get('/api/admin/auth/keep-login')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Invalid user');
  })
});
