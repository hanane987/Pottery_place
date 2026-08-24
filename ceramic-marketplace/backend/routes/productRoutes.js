import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

router.get('/all', productController.getAllProducts);
router.get('/', productController.getProductsByVendor);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct); 
router.put('/:id', productController.updateProduct); 
router.delete('/:id', productController.deleteProduct);

export default router;