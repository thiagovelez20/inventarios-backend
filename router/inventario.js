const { Router } = require('express');
const Inventario = require('../models/Inventario');

const router = Router();

//listar inventario
router.get('/', async function (req, res) {
    //capturar inventarios con Join obteniendo los datos por medio del id y mostrando solo los campos necesarios.
    try {
        const inventarios = await Inventario.find().populate([
           {
                path: 'usuario', select: 'nombre email estado'
           },
           {
                path: 'marca', select: 'nombre estado'
           },
           {
                path: 'tipoEquipo', select: 'nombre estado'
           },
           {
                path: 'estadoEquipo', select: 'nombre estado'
           },
        ]);
        res.send(inventarios);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar inventarios');
    }
});

//crear inventario
router.post('/', async function (req, res) {
    try {
        const existeInventarioPorSerial = await Inventario.findOne({ serial: req.body.serial });
       
        if (existeInventarioPorSerial) {
            return res.send('Ya existe el serial en otro equipo');
        }

        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.tipoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

       inventario = await inventario.save();

       res.send(inventario);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar inventarios');
    }
});
//metodo actualizar
router.put('/:inventarioId', async function (req, res) {
    try {

        let inventario = await Inventario.findById(req.params.inventarioId);
        if(!inventario){
            return res.send('Inventario no existe');
        }

        const existeInventarioPorSerial = await Inventario
                             .findOne({ serial: req.body.serial, _id: { $ne: inventario._id} });

        if (existeInventarioPorSerial) {
            return res.send('Ya existe el serial en otro equipo');
        }

        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.tipoEquipo._id;
        inventario.fechaActualizacion = new Date();

       inventario = await inventario.save();

       res.send(inventario);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar inventarios');
    }

});

module.exports = router;