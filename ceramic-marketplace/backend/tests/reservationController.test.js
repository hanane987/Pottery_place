const { createReservation, getAllReservations, getOrdersByVendor } = require('../controllers/reservationController');
const Reservation = require('../models/Reservation');
const Product = require('../models/Product');

jest.mock('../models/Reservation');
jest.mock('../models/Product');

describe('Reservation Controller', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => {});
        mockReq = {
            body: {},
            params: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });

    describe('createReservation', () => {
        it('should create reservations successfully', async () => {
            mockReq.body = {
                items: [
                    {
                        productId: 'product1',
                        userId: 'user1',
                        quantity: 2,
                        name: 'John Doe',
                        email: 'john@example.com',
                        address: '123 Main St',
                    },
                ],
            };

            const mockProduct = {
                _id: 'product1',
                nom: 'Test Product',
                quantite_stock: 5,
                artisan_id: 'vendor1',
                save: jest.fn().mockResolvedValue(),
            };
            Product.findById.mockResolvedValue(mockProduct);

            const mockReservation = {
                productId: 'product1',
                userId: 'user1',
                vendorId: 'vendor1',
                quantity: 2,
                name: 'John Doe',
                email: 'john@example.com',
                address: '123 Main St',
                reservedAt: expect.any(Date),
                expiresAt: expect.any(Date),
                save: jest.fn().mockResolvedValue(),
            };
            Reservation.mockImplementation(() => mockReservation);

            await createReservation(mockReq, mockRes);

            expect(Product.findById).toHaveBeenCalledWith('product1');
            expect(mockProduct.save).toHaveBeenCalled();
            expect(mockProduct.quantite_stock).toBe(3);
            expect(mockReservation.save).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Reservations created successfully',
                reservations: [mockReservation],
            });
        });

        it('should return 400 if items array is empty', async () => {
            mockReq.body = { items: [] };

            await createReservation(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid or empty items array' });
        });

        it('should return 400 if required fields are missing', async () => {
            mockReq.body = {
                items: [{ productId: 'product1', userId: 'user1', quantity: 2 }],
            };

            await createReservation(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Missing required fields in reservation item' });
        });

        it('should return 400 if quantity exceeds stock', async () => {
            mockReq.body = {
                items: [
                    {
                        productId: 'product1',
                        userId: 'user1',
                        quantity: 10,
                        name: 'John Doe',
                        email: 'john@example.com',
                        address: '123 Main St',
                    },
                ],
            };

            const mockProduct = {
                _id: 'product1',
                nom: 'Test Product',
                quantite_stock: 5,
                artisan_id: 'vendor1',
                save: jest.fn().mockResolvedValue(),
            };
            Product.findById.mockResolvedValue(mockProduct);

            await createReservation(mockReq, mockRes);

            expect(Product.findById).toHaveBeenCalledWith('product1');
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: 'Product Test Product not available in requested quantity. Requested: 10, Available: 5',
            });
        });
    });

    describe('getAllReservations', () => {
        it('should fetch all reservations successfully', async () => {
            const mockReservations = [
                { productId: 'product1', userId: 'user1', vendorId: 'vendor1' },
            ];
            const populateChain = {
                populate: jest.fn().mockResolvedValue(mockReservations),
            };
            const firstPopulate = {
                populate: jest.fn().mockReturnValue(populateChain),
            };
            Reservation.find.mockReturnValue(firstPopulate);

            await getAllReservations(mockReq, mockRes);

            expect(Reservation.find).toHaveBeenCalled();
            expect(firstPopulate.populate).toHaveBeenCalledWith('productId');
            expect(populateChain.populate).toHaveBeenCalledWith('userId', 'nom email');
            expect(mockRes.json).toHaveBeenCalledWith(mockReservations);
        });

        it('should handle errors when fetching reservations', async () => {
            const populateChain = {
                populate: jest.fn().mockRejectedValue(new Error('Database error')),
            };
            const firstPopulate = {
                populate: jest.fn().mockReturnValue(populateChain),
            };
            Reservation.find.mockReturnValue(firstPopulate);

            await getAllReservations(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error fetching reservations' });
        });
    });

    describe('getOrdersByVendor', () => {
        it('should fetch orders by vendor successfully', async () => {
            mockReq.params = { vendorId: 'vendor1' };

            const mockOrders = [
                { productId: 'product1', userId: 'user1', vendorId: 'vendor1' },
            ];
            const populateChain = {
                populate: jest.fn().mockResolvedValue(mockOrders),
            };
            const firstPopulate = {
                populate: jest.fn().mockReturnValue(populateChain),
            };
            Reservation.find.mockReturnValue(firstPopulate);

            await getOrdersByVendor(mockReq, mockRes);

            expect(Reservation.find).toHaveBeenCalledWith({ vendorId: 'vendor1' });
            expect(firstPopulate.populate).toHaveBeenCalledWith('productId');
            expect(populateChain.populate).toHaveBeenCalledWith('userId', 'nom email');
            expect(mockRes.json).toHaveBeenCalledWith(mockOrders);
        });
    });
});