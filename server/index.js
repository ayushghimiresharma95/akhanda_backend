const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("passport");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const Lounas = require("./models/lunch");
const Orders = require("./models/orders");
const CryptoJS = require('crypto-js');
const Notices = require("./models/Notice");
const Alacartes = require("./models/Alacarte"); // Ensure correct import

dotenv.config();

app.use(express.json()); // Use built-in middleware for JSON parsing
app.use(cors({
    origin: "https://ravintolaakhanda.fi",
    methods: "GET,POST,PUT,DELETE",
}));

app.use(cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session());
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://ayushghimire95:admin@cluster0.z9m6bqp.mongodb.net/ecommerce')
    .then(() => {
        app.listen(3002, () => console.log(`Server is running on port ${process.env.PORT || 3002}`));
    })
    .catch(err => console.log(err));

// Log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    console.log('Request body:', req.body);
    next();
});

// Define your route for getting lunch data
app.get("/api/lounas", async (req, res) => {
    try {
        const Lunch = await Lounas.find();
        console.log(Lunch);
        res.status(200).json(Lunch);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while retrieving lunch data." });
    }
});

app.get("/api/notice", async (req, res) => {
    try {
        console.log("Fetching notices");
        const notice = await Notices.find();
        console.log(notice);
        res.status(200).json(notice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while retrieving the Notice." });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const encryptedData = req.body.data;
        console.log(req.body.data);
        
        // Decrypt the order details
        const bytes = CryptoJS.AES.decrypt(encryptedData, 'Padama_akhanda');
        const decryptedOrderDetails = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        const order = new Orders(decryptedOrderDetails);
        await order.save();

        res.status(201).json({ message: 'Order created successfully!' });
    } catch (error) {
        console.error("Error while creating order:", error);
        res.status(500).json({ message: 'An error occurred while creating the order.' });
    }
});

app.get('/api/alacarte', async (req, res) => {
    try {
        // Fetch all Alacarte documents
        const alacarte = await Alacartes.find();

        // Map through the sections and find items with `seen: true`
        const updateMenu = alacarte.map(({ section, index, items }) => {
            return {
                section,
                index: Number(index), // Ensure the index is a number
                items: items.filter(item => item.seen === true)
            };
        });
        console.log(updateMenu)

        // Filter out sections that have no items with `seen: true`
        const filteredMenu = updateMenu.filter(({ items }) => items.length > 0);

        // Sort the filtered menu based on the index field
        filteredMenu.sort((a, b) => a.index - b.index);

        res.status(200).json(filteredMenu);
    } catch (error) {
        console.error('Error fetching or updating menu items:', error);
        res.status(500).json({ message: 'An error occurred while fetching or updating menu items.' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON');
        return res.status(400).send({ message: 'Invalid JSON' });
    }
    next();
});

module.exports = app;
