// Importar dependencias
const express = require("express");
const fs = require("fs");

// Crear aplicación de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivo donde se guardan los usuarios
const USERS_FILE = "./users.json";

// Funciones auxiliares para leer y escribir
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, "utf8");
  return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Página principal con formulario
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Registro de Usuarios</title>
      </head>
      <body>
        <h1>Registrar Usuario</h1>
        <form action="/users" method="post">
          <label>Nombre completo: <input type="text" name="nombreCompleto" required></label><br>
          <label>Fecha de nacimiento: <input type="date" name="fechaNacimiento" required></label><br>
          <label>Edad: <input type="number" name="edad" required></label><br>
          <label>Sexo/Género: <input type="text" name="sexo" required></label><br>
          <label>Lugar de nacimiento: <input type="text" name="lugarNacimiento" required></label><br>
          <label>Nacionalidad: <input type="text" name="nacionalidad" required></label><br>
          <label>Dirección: <input type="text" name="direccion" required></label><br>
          <label>Teléfono: <input type="text" name="telefono" required></label><br>
          <label>Correo electrónico: <input type="email" name="correo" required></label><br>
          <label>Estado civil: <input type="text" name="estadoCivil" required></label><br><br>
          <button type="submit">Guardar</button>
        </form>
        <br>
        <a href="/users">Ver todos los usuarios</a>
      </body>
    </html>
  `);
});

// Añadir un usuario (desde formulario o JSON)
app.post("/users", (req, res) => {
  const users = loadUsers();

  const user = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    nombreCompleto: req.body.nombreCompleto,
    fechaNacimiento: req.body.fechaNacimiento,
    edad: req.body.edad,
    sexo: req.body.sexo,
    lugarNacimiento: req.body.lugarNacimiento,
    nacionalidad: req.body.nacionalidad,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    estadoCivil: req.body.estadoCivil,
  };

  users.push(user);
  saveUsers(users);

  // Si viene de formulario, redirigir a /users
  if (req.headers["content-type"]?.includes("application/json")) {
    res.status(201).json({ message: "Usuario agregado correctamente", user });
  } else {
    res.redirect("/users");
  }
});

// Ver todos los usuarios en tabla
app.get("/users", (req, res) => {
  const users = loadUsers();

  if (users.length === 0) {
    return res.send("<h2>No hay usuarios registrados todavía</h2><a href='/'>Registrar usuario</a>");
  }

  let tableRows = users
    .map(
      (u) => `
    <tr>
      <td>${u.id}</td>
      <td>${u.nombreCompleto}</td>
      <td>${u.fechaNacimiento}</td>
      <td>${u.edad}</td>
      <td>${u.sexo}</td>
      <td>${u.lugarNacimiento}</td>
      <td>${u.nacionalidad}</td>
      <td>${u.direccion}</td>
      <td>${u.telefono}</td>
      <td>${u.correo}</td>
      <td>${u.estadoCivil}</td>
    </tr>
  `
    )
    .join("");

  res.send(`
    <html>
      <head>
        <title>Usuarios registrados</title>
      </head>
      <body>
        <h1>Lista de usuarios</h1>
        <table border="1" cellpadding="5">
          <tr>
            <th>ID</th>
            <th>Nombre completo</th>
            <th>Fecha de nacimiento</th>
            <th>Edad</th>
            <th>Sexo</th>
            <th>Lugar de nacimiento</th>
            <th>Nacionalidad</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Estado civil</th>
          </tr>
          ${tableRows}
        </table>
        <br>
        <a href="/">Registrar nuevo usuario</a>
      </body>
    </html>
  `);
});

// Obtener usuario por ID (JSON)
app.get("/users/:id", (req, res) => {
  const users = loadUsers();
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user);
});

// Modificar usuario por ID
app.put("/users/:id", (req, res) => {
  const users = loadUsers();
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) return res.status(404).json({ message: "Usuario no encontrado" });

  users[index] = { ...users[index], ...req.body };
  saveUsers(users);

  res.json({ message: "Usuario modificado correctamente", user: users[index] });
});

// Eliminar usuario por ID
app.delete("/users/:id", (req, res) => {
  const users = loadUsers();
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) return res.status(404).json({ message: "Usuario no encontrado" });

  const deletedUser = users.splice(index, 1);
  saveUsers(users);

  res.json({ message: "Usuario eliminado correctamente", user: deletedUser[0] });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
