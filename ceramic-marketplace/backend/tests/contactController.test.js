const { storeContactMessage, getContactMessages } = require('../controllers/contactController');
const ContactMessage = require('../models/Contact');

// Mock the ContactMessage model
jest.mock('../models/Contact');

describe('Contact Controller', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock request and response objects
    mockReq = {
      body: {},
      query: {}, // For potential filtering tests
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  // Test storeContactMessage (5 tests)
  describe('storeContactMessage', () => {
    it('should store a contact message successfully', async () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      };

      const mockMessage = {
        ...mockReq.body,
        save: jest.fn().mockResolvedValue(),
      };
      ContactMessage.mockImplementation(() => mockMessage);

      await storeContactMessage(mockReq, mockRes);

      expect(ContactMessage).toHaveBeenCalledWith(mockReq.body);
      expect(mockMessage.save).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith('Message stored successfully');
    });

    it('should handle errors when storing a message', async () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      };

      const mockMessage = {
        ...mockReq.body,
        save: jest.fn().mockRejectedValue(new Error('Database error')),
      };
      ContactMessage.mockImplementation(() => mockMessage);

      await storeContactMessage(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith('Error storing message');
    });

    it('should reject message with missing name', async () => {
      mockReq.body = {
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      };

      const mockMessage = {
        ...mockReq.body,
        save: jest.fn().mockRejectedValue(new Error('Name is required')),
      };
      ContactMessage.mockImplementation(() => mockMessage);

      await storeContactMessage(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith('Error storing message');
    });

    it('should reject message with missing email', async () => {
      mockReq.body = {
        name: 'John Doe',
        subject: 'Test Subject',
        message: 'This is a test message',
      };

      const mockMessage = {
        ...mockReq.body,
        save: jest.fn().mockRejectedValue(new Error('Email is required')),
      };
      ContactMessage.mockImplementation(() => mockMessage);

      await storeContactMessage(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith('Error storing message');
    });

    it('should reject message with missing message content', async () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
      };

      const mockMessage = {
        ...mockReq.body,
        save: jest.fn().mockRejectedValue(new Error('Message is required')),
      };
      ContactMessage.mockImplementation(() => mockMessage);

      await storeContactMessage(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith('Error storing message');
    });
  });

  // Test getContactMessages (3 tests)
  describe('getContactMessages', () => {
    it('should fetch all contact messages successfully', async () => {
      const mockMessages = [
        { name: 'John Doe', email: 'john@example.com', subject: 'Test', message: 'Hello' },
        { name: 'Jane Doe', email: 'jane@example.com', subject: 'Query', message: 'Hi' },
      ];
      ContactMessage.find.mockResolvedValue(mockMessages);

      await getContactMessages(mockReq, mockRes);

      expect(ContactMessage.find).toHaveBeenCalledWith();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockMessages);
    });

    it('should return an empty array when no messages exist', async () => {
      ContactMessage.find.mockResolvedValue([]);

      await getContactMessages(mockReq, mockRes);

      expect(ContactMessage.find).toHaveBeenCalledWith();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([]);
    });

    it('should handle errors when fetching messages', async () => {
      ContactMessage.find.mockRejectedValue(new Error('Database error'));

      await getContactMessages(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith('Error fetching messages');
    });
  });
});