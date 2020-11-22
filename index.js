const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'});

// Cors perimite que un cleinte se conecte a otro servidor para el intercambio de recursos

const cors = require('cors');

// conector mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true
});

// crear el servidor
const app = express();

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Definir un dominio para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) =>{
        // Revisar si la peticion viene de un servidor que eesta en whitelist
        const existe = whitelist.some( dominio => dominio === origin);
        if(existe){
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}

//Habilitar cors
app.use(cors(corsOptions));

// Rutas de la app
app.use('/', routes());

// carpeta public
app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

// iniciar APP
app.listen(port, host ,() => {
    console.log('el servidor esta funcionando');
})


