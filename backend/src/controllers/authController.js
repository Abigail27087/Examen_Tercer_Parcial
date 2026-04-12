const prisma = require('../config/db');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
    const { username, password } = req.body;

    const usuario = await prisma.login.findFirst({
        where: {
            usuario: username,
            contrase_a: password,
        }
    });

    if (!usuario) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: usuario.id, username: usuario.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ 
        mensaje: 'Inicio de sesión exitoso',
        token: token,
        usuario: {
            id: usuario.id,
            username: usuario.username,
        }
    });
} catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
}
};

const perfil = async (req, res) => {
    res.json({
        mensaje: 'Perfil del usuario',
        usuario: req.usuario,
    });
};

module.exports = { login , perfil };
