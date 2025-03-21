const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/all', productController.getAllProducts);
router.get('/', productController.getProductsByVendor);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct); 
router.put('/:id', productController.updateProduct); 
router.delete('/:id', productController.deleteProduct);

module.exports = router;