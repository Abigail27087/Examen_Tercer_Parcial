const express = require('express');
const router = express.Router();
const { verTodos, verUno, agregar, actualizar  } = require('../controllers/usuariosController');

router.get('/', verTodos);
router.get('/:id', verUno);
router.post('/', agregar);
router.put('/:id', actualizar);

module.exports = router;