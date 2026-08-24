import Product from '../models/Product.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ error: 'Error fetching all products', details: error.message });
    }
};

export const createProduct = (req, res) => {
    upload.array('images')(req, res, async (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(500).json({ message: "Error uploading files", details: err.message });
        }

        try {
            const { nom, description, prix, quantite_stock, artisan_id, categorie_id, etat } = req.body;
            const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

            // Validate artisan_id
            if (!artisan_id) {
                return res.status(400).json({ message: "artisan_id is required" });
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
            res.status(500).json({ message: "Error creating product", details: error.message });
        }
    });
};



export const updateProduct = (req, res) => {
    upload.array('images')(req, res, async (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(500).json({ message: "Error uploading files", details: err.message });
        }

        try {
            const { id } = req.params;
            const { nom, description, prix, quantite_stock, artisan_id, categorie_id, etat } = req.body;
            const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : undefined;

            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                {
                    nom,
                    description,
                    prix,
                    quantite_stock,
                    artisan_id,
                    categorie_id,
                    etat,
                    ...(images && { images }), // Only update images if new ones are uploaded
                },
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ message: 'Error updating product', details: error.message });
        }
    });
};


export const deleteProduct = async (req, res) => {
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



export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error fetching product', details: error.message });
    }
};



export const getProductsByVendor = async (req, res) => {
    const artisan_id = req.query.artisan_id;
    try {
        if (!artisan_id) {
            return res.status(400).json({ message: "artisan_id is required" });
        }
        const products = await Product.find({ artisan_id });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products', details: error.message });
    }
};