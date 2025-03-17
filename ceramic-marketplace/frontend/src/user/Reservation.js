import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Reservation = () => {
    const query = new URLSearchParams(useLocation().search);
    const productId = query.get('productId');
    const quantity = parseInt(query.get('quantity'), 10);

    // Mock product data (replace this with a fetch call to get actual product data)
    const productPrice = 89.99; // Replace with actual product price from your database
    const totalPrice = (productPrice * quantity).toFixed(2);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [vendorId] = useState('67d2e2b9f30eb6811fdf36a0'); // Replace with actual vendor ID

    const handleReservation = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId,
                    userId: '67bc4861f605323671ead826', // Updated with your user ID
                    vendorId, // Include vendorId in the request
                    quantity,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to reserve product');
            }

            const data = await response.json();
            toast.success(data.message);
            // Redirect or perform any other action after successful reservation
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h1>Reservation Page</h1>
            <h2>Product ID: {productId}</h2>
            <h3>Quantity: {quantity}</h3>
            <h3>Total Price: ${totalPrice}</h3>

            <form onSubmit={handleReservation}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Confirm Reservation</button>
            </form>
        </div>
    );
};

export default Reservation;