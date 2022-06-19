const mongoose = require('mongoose');
// mongoose permet de structurer en schéma les données

const sauceSchema = mongoose.Schema(
    {

        userId: {type: String, required:true},
        
        name:{type:String, required:true},

        manufacturer:{type:String, required:true},

        description:{type:String, required:true},

        mainPepper : {type: String, required: true},

        imageUrl: {type: String, required: true},

        heat: {type: Number, required: true},

        likes : {type: Number, default: 0, required: true},

        dislikes : {type: Number, default: 0, required: true},

        usersLiked: {type: Array, required: true},

        usersDisliked: {type: Array, required: true}
    }
    // l'argument de la méthode Schema est donc un objet
);

module.exports = mongoose.model('Sauce', sauceSchema);