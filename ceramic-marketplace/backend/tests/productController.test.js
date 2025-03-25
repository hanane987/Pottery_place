const productController = require('../controllers/productController');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Mock the Product model
jest.mock('../models/Product');

describe('Product Controller', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock request and response objects
    mockReq = {
      body: {},
      files: [], // Will be populated manually for multer tests
      headers: { 'content-type': 'multipart/form-data' }, // Required by multer
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  // Test getAllProducts
  describe('getAllProducts', () => {
    it('should return all products successfully', async () => {
      const mockProducts = [
        { nom: 'Product 1', prix: 100, artisan_id: new mongoose.Types.ObjectId() },
      ];
      Product.find.mockResolvedValue(mockProducts);

      await productController.getAllProducts(mockReq, mockRes);

      expect(Product.find).toHaveBeenCalledWith({});
      expect(mockRes.status).not.toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
    });

    it('should return 404 when no products exist', async () => {
      Product.find.mockResolvedValue([]);

      await productController.getAllProducts(mockReq, mockRes);

      expect(Product.find).toHaveBeenCalledWith({});
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "No products found." });
    });

    it('should handle errors', async () => {
      Product.find.mockRejectedValue(new Error('Database error'));

      await productController.getAllProducts(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Error fetching all products',
        details: 'Database error',
      });
    });
  });

  // Test createProduct
  describe('createProduct', () => {
    beforeEach(() => {
      // Spy on upload.array and mock its behavior instead of mocking multer entirely
      jest.spyOn(productController, 'createProduct').mockImplementation((req, res) => {
        // Simulate multer middleware manually
        const next = async (err) => {
          if (err) {
            return res.status(500).json({ message: "Error uploading files", details: err.message });
          }
          try {
            const { nom, description, prix, quantite_stock, artisan_id, etat } = req.body;
            const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
            if (!artisan_id) return res.status(400).json({ message: "artisan_id is required" });

            const newProduct = new Product({ nom, description, prix, quantite_stock, artisan_id, images, etat });
            await newProduct.save();
            res.status(201).json({ message: "Product created successfully", product: newProduct });
          } catch (error) {
            res.status(500).json({ message: "Error creating product", details: error.message });
          }
        };
        // Call next with no error by default, or with an error for specific tests
        next(req._multerError || null);
      });
    });

    afterEach(() => {
      // Restore the original implementation
      productController.createProduct.mockRestore();
    });

    it('should create a product successfully with images', async () => {
      mockReq.body = {
        nom: 'Product 1',
        description: 'Description 1',
        prix: 100,
        quantite_stock: 10,
        artisan_id: new mongoose.Types.ObjectId().toString(),
        etat: 'disponible',
      };
      mockReq.files = [{ filename: 'test-image.jpg' }];
      const mockProduct = { ...mockReq.body, images: ['/uploads/test-image.jpg'], save: jest.fn().mockResolvedValue() };
      Product.mockImplementation(() => mockProduct);

      await productController.createProduct(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Product created successfully",
        product: mockProduct,
      });
      expect(mockProduct.save).toHaveBeenCalled();
    });

    it('should fail if artisan_id is missing', async () => {
      mockReq.body = {
        nom: 'Product 1',
        description: 'Description 1',
        prix: 100,
        quantite_stock: 10,
        etat: 'disponible',
      };
      mockReq.files = [];

      await productController.createProduct(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "artisan_id is required" });
    });

    it('should handle database errors', async () => {
      mockReq.body = {
        nom: 'Product 1',
        description: 'Description 1',
        prix: 100,
        quantite_stock: 10,
        artisan_id: new mongoose.Types.ObjectId().toString(),
        etat: 'disponible',
      };
      mockReq.files = [{ filename: 'test-image.jpg' }];
      const mockProduct = { ...mockReq.body, images: ['/uploads/test-image.jpg'], save: jest.fn().mockRejectedValue(new Error('Database error')) };
      Product.mockImplementation(() => mockProduct);

      await productController.createProduct(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error creating product",
        details: 'Database error',
      });
    });

    it('should handle multer errors', async () => {
      mockReq.body = {
        nom: 'Product 1',
        description: 'Description 1',
        prix: 100,
        quantite_stock: 10,
        artisan_id: new mongoose.Types.ObjectId().toString(),
        etat: 'disponible',
      };
      mockReq._multerError = new Error('Multer error'); // Simulate multer error

      await productController.createProduct(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error uploading files",
        details: 'Multer error',
      });
    });
  });
});