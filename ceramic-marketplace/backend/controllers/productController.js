const Product = require('../models/Product');


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
    console.log('Files uploaded:', req.files);
    try {
        const { nom, description, prix, quantite_stock, artisan_id, etat } = req.body;
        const images = req.files.map(file => `/images/${file.filename}`); 

        const newProduct = new Product({
            nom,
            description,
            prix,
            quantite_stock,
            artisan_id,
            etat,
            images, 
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product' });
    }
};
