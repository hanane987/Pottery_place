const express = require('express');
const multer = require('multer');
const router = express.Router();
const productController = require('../controllers/productController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', productController.getProducts);
router.post('/', upload.array('images'), productController.createProduct);
router.put('/:id', upload.array('images'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/:id', productController.getProductById);

module.exports = router;