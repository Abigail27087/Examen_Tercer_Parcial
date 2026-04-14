require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.get('/api/health', (req, res) => {
    res.json({
        estado : 'Servidor corriendo ok',
        hora : new Date().toLocaleDateString('es-MX'),
        base_datos : 'databaseproject',
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log('BD : databaseproject');
});

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function crearUsuario() {
  const nuevo = await prisma.register.create({
    data: {
      // ajusta según tus campos
      name: "Abigail",
      email: "abi@gmail.com"
    }
  });

  console.log("Usuario creado:", nuevo);
}

crearUsuario();