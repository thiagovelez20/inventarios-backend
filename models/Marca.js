const { Schema, model } = require('mongoose');

const MarcaSchema = Schema({
    nombre: {
        type: String,
        required:false,
    },
    estado: {
        type: String,
        required: false,
        enum: ['Activo', 'Inactivo'],
    },
    fechaCreacion: {
        type: Date,
        required: true,
    },
    fechaActualizacion: {
        type: Date,
        required: true,
    }

});

module.exports = model('Marca', MarcaSchema);