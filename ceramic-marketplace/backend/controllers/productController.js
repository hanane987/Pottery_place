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
}