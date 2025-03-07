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
    return (
        <div className={styles.container}>
            <h2>Manage Products</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="hidden" name="id" value={formData.id} />
                <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input type="number" name="prix" placeholder="Prix" value={formData.prix} onChange={handleChange} required />
                <input type="number" name="quantite_stock" placeholder="Quantité en stock" value={formData.quantite_stock} onChange={handleChange} required />
                
                <select name="artisan_id" value={formData.artisan_id} onChange={handleChange} required style={{ color: 'black' }}>
                    <option value="">Select Artisan</option>
                    {artisans.map(artisan => (
                        <option key={artisan._id} value={artisan._id}>{artisan.nom}</option> // Ensure artisan._id is unique
                    ))}
                </select>

                <select name="categorie_id" value={formData.categorie_id} onChange={handleChange} required>
    <option value="">Select Category</option>
    {categories.map(category => (
        <option key={category.id} value={category.id}>{category.name}</option> // Static categories
    ))}
</select>

                <input type="file" name="images" multiple onChange={handleImageChange} accept="image/*" />
                <select name="etat" value={formData.etat} onChange={handleChange}>
                    <option value="disponible">Disponible</option>
                    <option value="épuisé">Épuisé</option>
                </select>
                <button type="submit" className={styles.submitButton}>Save Product</button>
            </form>
            <h3>Product List</h3>
            <ul className={styles.productList}>
                {products.map(product => (
                    <li key={product._id} className={styles.productItem}>
<img src={Array.isArray(product.images) ? product.images[0] : product.images} alt={product.nom} className={styles.productImage} />                        <div className={styles.productDetails}>
                            <h4>{product.nom}</h4>
                            <p>{product.prix} €</p>
                            <button onClick={() => handleEdit(product)} className={styles.editButton}><i className="fas fa-edit"></i> Edit</button>
                            <button onClick={() => handleDelete(product._id)} className={styles.deleteButton}><i className="fas fa-trash"></i> Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageProducts;