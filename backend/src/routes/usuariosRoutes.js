const express = require('express');
const router = express.Router();

const prisma = require('../config/db');

const {
  verTodos,
  verUno,
  agregar,
  actualizar
} = require('../controllers/usuariosController');

router.get('/', verTodos);
router.get('/:id', verUno);
router.post('/', agregar);
router.put('/:id', actualizar);


// REGISTRO DE USUARIO DESDE ANGULAR
router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password
      }
    });

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

module.exports = router;