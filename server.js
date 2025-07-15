const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// MongoDB connection
let db;
let emailCollection;

async function connectToMongoDB() {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        
        db = client.db('tonely');
        emailCollection = db.collection('emails');
        
        // Create index on email field for uniqueness
        await emailCollection.createIndex({ email: 1 }, { unique: true });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Email signup endpoint
app.post('/api/signup', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Validate email
        if (!email || !email.includes('@')) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide a valid email address' 
            });
        }
        
        // Save email to database
        const emailDoc = {
            email: email.toLowerCase().trim(),
            signupDate: new Date(),
            source: 'landing_page'
        };
        
        await emailCollection.insertOne(emailDoc);
        
        console.log(`New email signup: ${email}`);
        
        res.json({ 
            success: true, 
            message: 'Successfully joined the email list!' 
        });
        
    } catch (error) {
        console.error('Email signup error:', error);
        
        // Handle duplicate email
        if (error.code === 11000) {
            return res.status(400).json({ 
                success: false, 
                message: 'This email is already on our list!' 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Something went wrong. Please try again.' 
        });
    }
});

// Get email count (optional analytics endpoint)
app.get('/api/stats', async (req, res) => {
    try {
        const count = await emailCollection.countDocuments();
        res.json({ totalEmails: count });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ error: 'Failed to get stats' });
    }
});

// Start server
async function startServer() {
    await connectToMongoDB();
    
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log('Email signup endpoint: POST /api/signup');
    });
}

startServer().catch(console.error);