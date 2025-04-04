const { getArtisans, getStatistics, banUser, unbanUser } = require('../controllers/userController');
const User = require('../models/User');
const Product = require('../models/Product');

// Mock the models
jest.mock('../models/User');
jest.mock('../models/Product');

describe('User Controller', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock request and response objects
    mockReq = {
      params: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  // Test for getArtisans (2 tests)
  describe('getArtisans', () => {
    it('should fetch artisans successfully', async () => {
      const mockArtisans = [
        { _id: '1', role: 'vendeur', name: 'Artisan 1' },
        { _id: '2', role: 'acheteur', name: 'Buyer 1' },
      ];
      User.find.mockResolvedValue(mockArtisans);

      await getArtisans(mockReq, mockRes);

      expect(User.find).toHaveBeenCalledWith({
        $or: [{ role: 'vendeur' }, { role: 'acheteur' }],
      });
      expect(mockRes.json).toHaveBeenCalledWith(mockArtisans);
    });

    it('should return empty array if no artisans found', async () => {
      User.find.mockResolvedValue([]);

      await getArtisans(mockReq, mockRes);

      expect(User.find).toHaveBeenCalledWith({
        $or: [{ role: 'vendeur' }, { role: 'acheteur' }],
      });
      expect(mockRes.json).toHaveBeenCalledWith([]);
    });
  });

  // Test for getStatistics (2 tests)
  describe('getStatistics', () => {
    it('should fetch statistics successfully', async () => {
      User.countDocuments
        .mockResolvedValueOnce(5) // vendeur count
        .mockResolvedValueOnce(10); // acheteur count
      Product.countDocuments.mockResolvedValue(20);

      await getStatistics(mockReq, mockRes);

      expect(User.countDocuments).toHaveBeenCalledWith({ role: 'vendeur' });
      expect(User.countDocuments).toHaveBeenCalledWith({ role: 'acheteur' });
      expect(Product.countDocuments).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({
        vendeurCount: 5,
        acheteurCount: 10,
        totalProducts: 20,
      });
    });

    it('should handle errors when fetching statistics', async () => {
      User.countDocuments.mockRejectedValue(new Error('Database error'));

      await getStatistics(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for banUser (2 tests)
  describe('banUser', () => {
    it('should ban a user successfully', async () => {
      mockReq.params.userId = 'user1';
      const mockUser = { _id: 'user1', is_banned: true };
      User.findByIdAndUpdate.mockResolvedValue(mockUser);

      await banUser(mockReq, mockRes);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'user1',
        { is_banned: true },
        { new: true }
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 if user not found', async () => {
      mockReq.params.userId = 'user1';
      User.findByIdAndUpdate.mockResolvedValue(null);

      await banUser(mockReq, mockRes);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'user1',
        { is_banned: true },
        { new: true }
      );
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  // Test for unbanUser (1 test)
  describe('unbanUser', () => {
    it('should unban a user successfully', async () => {
      mockReq.params.userId = 'user1';
      const mockUser = { _id: 'user1', is_banned: false };
      User.findByIdAndUpdate.mockResolvedValue(mockUser);

      await unbanUser(mockReq, mockRes);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'user1',
        { is_banned: false },
        { new: true }
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });
  });
});