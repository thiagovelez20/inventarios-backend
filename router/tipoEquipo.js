const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const router = Router();
//codigo nuevo
const tipoEquipo = require('../models/TipoEquipo');

router.post('/', async function(req, res) {
    try {

        console.log(req.body);
    
        let tipoequipo = new TipoEquipo();
        tipoequipo.nombre = req.body.nombre;
        tipoequipo.estado = req.body.estado;
        tipoequipo.fechaCreacion = new Date();
        tipoequipo.fechaActualizacion = new Date();
    
        tipoequipo = await tipoequipo.save();
        res.send(tipoequipo);
        
    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    }
});

router.get('/', async function(req, res) {
    try {
        const tipoE = await TipoEquipo.find();
        res.send(tipoE);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar Usuarios');
    }
});

router.put('/', function(req, res) {
    res.send('Estoy desde tipo equipo PUT')
});

module.exports = router;
