const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const LounasSchema = new Schema({
    päivä: {
        type: String,
        required: true,
    },
    tuotteet: [{
        id: {
            type: Number,
            required: true,
        },
        nimi: {
            type: String,
            required: true,
        },
        ainesosat: {
            type: String,
            required: true,
            min: 0,
        },
        eng_description:{
            type:String,
            required:true,
        }
    }],
}, { timestamps: true });

const Lounas = models.Lounas || model('Lounas', LounasSchema);

module.exports = Lounas;
