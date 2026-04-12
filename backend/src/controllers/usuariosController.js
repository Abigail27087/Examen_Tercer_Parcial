const { login } = require("./authController");
const prisma = require('../config/db');

const verTodos = async (req, res) => {
    try {
        const usuarios = await prisma.users.findMany({
            select: {
                id: true,
                nombre: true,
                apellido: true,
                matricula: true,
            },
            orderBy: [
                { id: 'asc' },
                { nombre: 'asc' },
                { apellido: 'asc' },
                { matricula: 'asc' },
            ]
        });

        res.json({
            total: usuarios.length,
            usuarios: usuarios,
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const verUno = async (req, res) => {
    try{
        const id = parseInt(req.params.id);

        const usuario = await prisma.login.findUnique({
            where: {login_id: id}
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const { password, ...usuarioSinPassword } = usuario;

        res.json(usuarioSinPassword);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const agregar = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const existe = await prisma.login.findFirst({
            where: { username: username }
        });

        if (existe) {
            return res.status(409).json({ message: 'El nombre de usuario ya existe' });
        }

        const nuevo = await prisma.login.create({
            data: {
                username: username,
                password: password,
            }
        });

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario: {
                id: nuevo.login_id,
                username: nuevo.username,
            }
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const actualizar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { username, password } = req.body;

        const usuario = await prisma.login.findUnique({
            where: { login_id: id }
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const actualizado = await prisma.login.update({
            where: { login_id: id },
            data: {
                username: username || usuario.username,
                password: password || usuario.password,
            }
        });

        res.json({
            message: 'Usuario actualizado exitosamente',
            usuario: {
                id: actualizado.login_id,
                username: actualizado.username,
            }
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
module.exports = { verTodos, verUno, agregar, actualizar };
