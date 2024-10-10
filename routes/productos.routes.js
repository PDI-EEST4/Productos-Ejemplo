const express = require('express');
const router = express.Router();

const { obtenerTodos, obtenerUno, crear, actualizar, borrar } = require('../controllers/productos.controller')

router.get('/', obtenerTodos);
router.get('/:id', obtenerUno);
router.post('/', crear);
router.put('/:id', actualizar);
router.delete('/:id', borrar);

module.exports = router;