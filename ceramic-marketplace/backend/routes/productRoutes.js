const express = require('express');
const multer = require('multer');
const router = express.Router();
const productController = require('../controllers/productController');

const upload = multer({ storage: multer.memoryStorage() });

// Use getProductsByVendor for vendor-specific products
router.get('/', productController.getProductsByVendor);
router.post('/', upload.array('images'), productController.createProduct);
router.put('/:id', upload.array('images'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/:id', productController.getProductById);

module.exports = router;