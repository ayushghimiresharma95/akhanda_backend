const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("passport");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const Lounas = require("./models/lunch"); // Ensure the correct path to your Lounas model

dotenv.config();

app.use(express.json()); // Use built-in middleware for JSON parsing
app.use(cors({
    origin: process.env.SITE,
    methods: "GET,POST,PUT,DELETE"
}));

app.use(cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session());

// Log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    console.log('Request body:', req.body);
    next();
});

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://ayushghimire95:admin@cluster0.z9m6bqp.mongodb.net/ecommerce')
    .then(() => {
        app.listen(3002, () => console.log(`Server is running on port ${process.env.PORT || 3001}`));
    })
    .catch(err => console.log(err));

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

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON');
        return res.status(400).send({ message: 'Invalid JSON' });
    }
    next();
});
