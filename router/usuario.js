const { Router } = require('express');
const Usuarios = require('../models/Usuario');
const router = Router();
const usuario = require('../models/Usuario');

//crear nuevo usuario
router.post('/', async function(req, res){

    try {
        console.log(req.body);
        
        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        console.log('Respuesta existe usuario', existeUsuario);
        if(existeUsuario) {
            return res.send('Email ya existe');
        }
    
    let usuario = new Usuarios();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    usuario.fechaCreacion = new Date();
    usuario.fechaActualizacion = new Date();

    usuario = await usuario.save();
    res.send(usuario);
        
    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    }
});

router.get('/', async function(req, res){
    try {
        const usuarios = await Usuarios.find();
        res.send(usuarios);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar Usuarios');
    }
});

router.put('/', function(req, res){
    res.send('Hola mundo estoy en crear usuario PUT');
});

module.exports = router;