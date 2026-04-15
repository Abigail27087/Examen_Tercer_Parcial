require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


// CONFIGURACIÓN CORS (permite conexión con Angular)
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));


// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// IMPORTACIÓN DE RUTAS
const authRoutes = require('./routes/authRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');


// USO DE RUTAS
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);


// RUTA DE PRUEBA DEL SERVIDOR
app.get('/api/health', (req, res) => {
  res.json({
    estado: 'Servidor corriendo ok',
    hora: new Date().toLocaleDateString('es-MX'),
    base_datos: 'databaseproject',
  });
});


// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  console.log('BD : databaseproject');
  });