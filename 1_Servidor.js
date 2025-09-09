// Importar el módulo http que viene integrado en Node.js
const http = require('http');

// Crear un servidor con el método http.createServer
const server = http.createServer((req, res) => {
  // Establecer el tipo de contenido en la respuesta HTTP
  res.setHeader('Content-Type', 'text/plain');

  // Escribir la respuesta
  res.write('Hola, este es tu servidor en Node.js!');
  
  // Terminar la respuesta
  res.end();
});

// Definir el puerto donde el servidor escuchará (ejemplo: 3000)
const PORT = 3000;

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
