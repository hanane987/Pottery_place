const Product = require('../models/Product');
const Minio = require('minio');

// Configure MinIO client
const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'Hanane',
    secretKey: 'Hanane987'
});

exports.getProductsByVendor = async (req, res) => {
    const artisan_id = req.query.artisan_id;
    console.log("Received artisan_id:", artisan_id); // Debug log
    try {
      if (!artisan_id) {
        return res.status(400).json({ message: "artisan_id is required" });
      }
      const products = await Product.find({ artisan_id: artisan_id });
      console.log("Filtered products:", products); // Debug log
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Error fetching products', details: error.message });
    }
  };


const categories = [
    { id: '60b8d8f9e3c1f8c1d4e0e1a1', name: 'Category 1' },
    { id: '60b8d8f9e3c1f8c1d4e0e1a2', name: 'Category 2' },
    { id: '60b8d8f9e3c1f8c1d4e0e1a3', name: 'Category 3' },
    { id: '60b8d8f9e3c1f8c1d4e0e1a4', name: 'Category 4' },
];

exports.getProducts = async (req, res) => {
    const { search, category, sort, inStock } = req.query;
    let query = {};

    if (search) {
        query.$or = [
            { nom: { $regex: search, $options: 'i' } }, 
            { description: { $regex: search, $options: 'i' } } 
        ];
    }

    if (category) {
        const categoryIds = categories
            .filter(cat => cat.name === category)
            .map(cat => cat.id);
        query.categorie_id = { $in: categoryIds }; 
    }

    if (inStock) {
        query.quantite_stock = { $gt: 0 }; 
    }

    try {
        let products = await Product.find(query);
        if (sort === 'asc') {
            products.sort((a, b) => a.prix - b.prix);
        } else if (sort === 'desc') {
            products.sort((a, b) => b.prix - a.prix);
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { nom, description, prix, quantite_stock, artisan_id, categorie_id, etat } = req.body;
        const images = [];

        // Upload each image to MinIO
        if (req.files) {
            for (const file of req.files) {
                const fileName = Date.now() + '-' + file.originalname;
                // Use fPutObject with a buffer
                await minioClient.putObject('your-bucket-name', fileName, file.buffer, file.size);
                images.push(`http://YOUR_MINIO_ENDPOINT:9000/your-bucket-name/${fileName}`);
            }
        }

        const newProduct = new Product({
            nom,
            description,
            prix,
            quantite_stock,
            artisan_id,
            categorie_id,
            images,
            etat,
        });

        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Error creating product" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description, prix, quantite_stock, artisan_id, etat } = req.body;
        const images = [];

        // Upload each image to MinIO
        if (req.files) {
            for (const file of req.files) {
                const fileName = Date.now() + '-' + file.originalname;
                // Use fPutObject with a buffer
                await minioClient.putObject('your-bucket-name', fileName, file.buffer, file.size);
                images.push(`http://YOUR_MINIO_ENDPOINT:9000/your-bucket-name/${fileName}`);
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            nom,
            description,
            prix,
            quantite_stock,
            artisan_id,
            etat,
            images: images.length ? images : undefined 
        }, { new: true });

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).send(); 
    } catch (error) {
        console.error('Error deleting product:', error); 
        res.status(400).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error fetching product' });
    }
};
