// src/models/Alacarte.js
const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const ItemSchema = new mongoose.Schema({
    name: { type: String},
    price: { type: String },
    description: { type: String},
    ingredients: { type: String },
    seen:{type:Boolean} // Adjust as needed
});

const AlacarteSchema = new mongoose.Schema({
    section: { type: String, required: true },
    note: { type: String },
    items: { type: [ItemSchema], required: true },
    index: { type: Number } // Adjust as needed
});

const Alacarte = mongoose.models.Alacarte || mongoose.model('Alacarte', AlacarteSchema);

module.exports = Alacarte;