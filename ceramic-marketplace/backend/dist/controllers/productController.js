const Product = require('../models/Product');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({
  storage: storage
});
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) return res.status(404).json({
      message: "No products found."
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({
      error: 'Error fetching all products',
      details: error.message
    });
  }
};
exports.createProduct = (req, res) => {
  upload.array('images')(req, res, async err => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({
        message: "Error uploading files",
        details: err.message
      });
    }
    try {
      const {
        nom,
        description,
        prix,
        quantite_stock,
        artisan_id,
        etat
      } = req.body;
      const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

      // Validate artisan_id
      if (!artisan_id) {
        return res.status(400).json({
          message: "artisan_id is required"
        });
      }
      const newProduct = new Product({
        nom,
        description,
        prix,
        quantite_stock,
        artisan_id,
        images,
        etat
      });
      await newProduct.save();
      res.status(201).json({
        message: "Product created successfully",
        product: newProduct
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({
        message: "Error creating product",
        details: error.message
      });
    }
  });
};
exports.updateProduct = (req, res) => {
  upload.array('images')(req, res, async err => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({
        message: "Error uploading files",
        details: err.message
      });
    }
    try {
      const {
        id
      } = req.params;
      const {
        nom,
        description,
        prix,
        quantite_stock,
        artisan_id,
        etat
      } = req.body;
      const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : undefined;
      const updatedProduct = await Product.findByIdAndUpdate(id, {
        nom,
        description,
        prix,
        quantite_stock,
        artisan_id,
        etat,
        ...(images && {
          images
        }) // Only update images if new ones are uploaded
      }, {
        new: true
      });
      if (!updatedProduct) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({
        message: 'Error updating product',
        details: error.message
      });
    }
  });
};
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(400).json({
      message: error.message
    });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      message: 'Error fetching product',
      details: error.message
    });
  }
};
exports.getProductsByVendor = async (req, res) => {
  const artisan_id = req.query.artisan_id;
  try {
    if (!artisan_id) {
      return res.status(400).json({
        message: "artisan_id is required"
      });
    }
    const products = await Product.find({
      artisan_id
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      error: 'Error fetching products',
      details: error.message
    });
  }
};