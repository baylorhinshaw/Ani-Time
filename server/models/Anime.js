const mongoose = require('mongoose');

const { Schema } = mongoose;

const animeSchema = new Schema({
    mal_id: {
      type: Number,
      required: true
    },
    genres: {
      type: [String]
    },
    titleJapanese: {
      type: String,
      trim: true
    },
    titleEnglish: {
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
