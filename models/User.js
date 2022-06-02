const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    email : {type: String, required: true, unique: true}, // mail must be unique
    password: {type: String, required: true}// must be hashed 



});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);