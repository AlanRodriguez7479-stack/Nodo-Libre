// Importar Express
const express = require('express');

// Crear una aplicación de Express
const app = express();

// Definir el puerto
const PORT = 3000;

// Crear una ruta para la página principal
app.get('/', (req, res) => {
  res.send('¡Hola, bienvenido a tu servidor Express!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
