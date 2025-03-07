import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/ManageProducts.module.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [artisans, setArtisans] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        nom: '',
        description: '',
        prix: '',
        quantite_stock: '',
        artisan_id: '',
        categorie_id: '', 
        images: '',
        etat: 'disponible',
    });

    // Static categories with the same IDs
    const categories = [
        { id: '60b8d8f9e3c1f8c1d4e0e1a1', name: 'Category 1' },
        { id: '60b8d8f9e3c1f8c1d4e0e1a2', name: 'Category 2' },
        { id: '60b8d8f9e3c1f8c1d4e0e1a3', name: 'Category 3' },
        { id: '60b8d8f9e3c1f8c1d4e0e1a4', name: 'Category 4' },
    ];

    useEffect(() => {
        fetchProducts();
        fetchArtisans(); 
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchArtisans = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/artisans');
            console.log(response.data); 
            setArtisans(response.data);
        } catch (error) {
            console.error('Error fetching artisans:', error); 
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(`Selected artisan ID: ${value}`); 
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        const imageFiles = Array.from(files); 
        setFormData({ ...formData, images: imageFiles }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData); 
        try {
            let response;
            if (formData.id) {
                response = await axios.put(`http://localhost:5000/api/products/${formData.id}`, formData);
                console.log('Product updated:', response.data);
            } else {
                response = await axios.post('http://localhost:5000/api/products', formData);
                console.log('Product created:', response.data);
            }
            setFormData({ id: '', nom: '', description: '', prix: '', quantite_stock: '', artisan_id: '', categorie_id: '', images: '', etat: 'disponible' });
            fetchProducts(); 
        } catch (error) {
            console.error('Error saving product:', error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = (product) => {
        console.log('Editing product:', product); 
        setFormData({
            id: product._id, 
            nom: product.nom,
            description: product.description,
            prix: product.prix,
            quantite_stock: product.quantite_stock,
            artisan_id: product.artisan_id,
            categorie_id: product.categorie_id,
            images: product.images,
            etat: product.etat,
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts(); 
        } catch (error) {
            console.error('Error deleting product:', error.response ? error.response.data : error.message);
        }
    };