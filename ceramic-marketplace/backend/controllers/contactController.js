import ContactMessage from '../models/Contact.js';

export const storeContactMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    const newMessage = new ContactMessage({ name, email, subject, message });
    try {
        await newMessage.save();
        res.status(201).send('Message stored successfully');
    } catch (error) {
        console.error('Error storing message:', error);
        res.status(500).send('Error storing message');
    }
};

export const getContactMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find();
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Error fetching messages');
    }
};