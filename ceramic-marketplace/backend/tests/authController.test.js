const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('../models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock request and response objects
    mockReq = {
      body: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  // Test registerUser
  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
      };

      User.findOne.mockResolvedValue(null); // No existing user
      bcrypt.hash.mockResolvedValue('hashedPassword123');
      const mockUser = { save: jest.fn().mockResolvedValue() };
      User.mockImplementation(() => mockUser);

      await registerUser(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
    });

    it('should return 400 if user already exists', async () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
      };

      User.findOne.mockResolvedValue({ email: 'john@example.com' }); // Existing user

      await registerUser(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });

    it('should handle errors during registration', async () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
      };

      User.findOne.mockRejectedValue(new Error('Database error'));

      await registerUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Error registering user',
        error: 'Database error',
      });
    });
  });

  // Test loginUser
  describe('loginUser', () => {
    it('should login a user successfully', async () => {
      mockReq.body = {
        email: 'john@example.com',
        password: 'password123',
      };

      const mockUser = {
        _id: 'user123',
        email: 'john@example.com',
        password: 'hashedPassword123',
        role: 'user',
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mockToken');

      await loginUser(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 'user123', role: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      expect(mockRes.json).toHaveBeenCalledWith({ token: 'mockToken', role: 'user' });
    });

    it('should return 401 if user not found', async () => {
      mockReq.body = {
        email: 'john@example.com',
        password: 'password123',
      };

      User.findOne.mockResolvedValue(null);

      await loginUser(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should return 401 if password does not match', async () => {
      mockReq.body = {
        email: 'john@example.com',
        password: 'password123',
      };

      const mockUser = {
        _id: 'user123',
        email: 'john@example.com',
        password: 'hashedPassword123',
        role: 'user',
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await loginUser(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
      expect(jwt.sign).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should handle errors during login', async () => {
      mockReq.body = {
        email: 'john@example.com',
        password: 'password123',
      };

      User.findOne.mockRejectedValue(new Error('Database error'));

      await loginUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Error logging in',
        error: 'Database error',
      });
    });
  });

  // Test logoutUser
  describe('logoutUser', () => {
    it('should logout a user successfully', async () => {
      await logoutUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User logged out successfully' });
    });
  });
});