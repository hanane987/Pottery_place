import React, { useState } from 'react';
import '../styles/Contact.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Message stored successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' }); 
        } else {
            alert('Failed to store message. Please try again.');
        }
    } catch (error) {
        console.error('Error storing message:', error);
        alert('An error occurred. Please try again later.');
    }
};
