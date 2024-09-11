// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB (Update the connection string as needed)
mongoose.connect('mongodb://localhost/ip-addresses', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for IP addresses
const ipSchema = new mongoose.Schema({
    ip: String,
    timestamp: { type: Date, default: Date.now }
});

const IpAddress = mongoose.model('IpAddress', ipSchema);

// Middleware
app.use(bodyParser.json());

// Endpoint to save IP address
app.post('/save-ip', async (req, res) => {
    const { ip } = req.body;
    if (ip) {
        const newIpAddress = new IpAddress({ ip });
        await newIpAddress.save();
        res.json({ message: 'IP address saved successfully' });
    } else {
        res.status(400).json({ message: 'No IP address provided' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
