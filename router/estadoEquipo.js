const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const router = Router();

//codigo nuevo
const estadoEquipo = require('../models/EstadoEquipo');

router.post('/', async function(req, res) {

    try {

        console.log(req.body);
    
        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();
    
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);
        
    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    }
});

router.get('/', async function(req, res) {
    try {
        const estadoE = await EstadoEquipo.find();
        res.send(estadoE);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar Usuarios');
    }
});

router.put('/', function(req, res) {
    res.send('Estoy desde estado equipo PUT')
});

module.exports = router;