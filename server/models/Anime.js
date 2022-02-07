const mongoose = require('mongoose');

const { Schema } = mongoose;

const animeSchema = new Schema({
    title_japanese: {
    type: String,
    trim: true
  },
    title_english: {
    type: String,
    trim: true
    },
    score: {
    type: Number,
    },
    image: {
    type: String,
    }
});

module.exports = animeSchema;
