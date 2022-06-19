const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const app = express();

const dotenv = require ("dotenv");
dotenv.config();



app.use(express.json())
app.use(express.urlencoded())
//au-dessus on s'assure que le CRUD sera en format json
app.use('/uploads', express.static('uploads'));


mongoose.connect(process.env.CONNECTION_URL, { 

    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then(
    ()=> console.log('Connexion à MongoB réussie !')
)
.catch(

    ()=> console.log('Connexion à MongoDB échouée')

);



//api middlewares 
app.use(cors());





app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
module.exports = app;