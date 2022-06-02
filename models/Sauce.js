const mongoose = require('mongoose');
// mongoose permet de structurer en schéma les données

const sauceSchema = mongoose.Schema(
    {

        userId: {type: String, required:true},
        
        name:{type:String, required:true},

        manufacturer:{type:Number, required:true},

        description:{type:Boolean, required:true},

        mainPepper : {type: String, required: true},

        imageUrl: {type: String, required: true},

        heat: {type: Number, required: true},

        likes : {type: Number, required: true},

        dislikes : {type: Number, required: true},

        usersLikes: {type: Array, required: true},

        usersDislikes: {type: Array, required: true}
    }
    // l'argument de la méthode Schema est donc un objet
);

module.exports = mongoose.model('Sauce', sauceSchema);