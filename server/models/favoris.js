'use strict';

let mongoose = require('mongoose');

let favoriteSchema = new mongoose.Schema({
	name: String,
	spot: [String]
});

module.exports = mongoose.model('favorite', favoriteSchema); 

