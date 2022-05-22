const { Router } = require('express');
const Marca = require('../models/Marca');
const router = Router();
const marca = require('../models/Usuario');
//codigo nuevo


router.post('/', async function(req, res) {

    try {

        console.log(req.body);

        const existeEstado= await Marca.findOne({ estado: req.body.estado });
        console.log('Respuesta existe usuario', existeEstado);
        if(existeEstado) {
            return res.send('estado ya existe');
        }
    
        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();
    
        marca = await marca.save();
        res.send(marca);
        
    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    }

   
});

router.get('/', async function(req, res) {
    try {
        const marcas = await Marca.find();
        res.send(marcas);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar Usuarios');
    }
});

router.put('/', function(req, res) {
    res.send('Estoy desde marca PUT')
});

module.exports = router;

