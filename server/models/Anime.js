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
    type: String,
    },
    image: {
    type: String,
    }
});

const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;
