const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database('./users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error("Error al abrir la base de datos", err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )`, (err) => {
            if (!err) {
                db.run("INSERT OR IGNORE INTO users (username, password) VALUES ('admin', 'password123')");
                db.run("INSERT OR IGNORE INTO users (username, password) VALUES ('maria', 'girasol2025')");
                db.run("INSERT OR IGNORE INTO users (username, password) VALUES ('carlos', 'futbol&amigos')");
            }
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log(`Ejecutando consulta peligrosa: ${query}`);

    db.get(query, (err, row) => {
        if (err) {
            return res.status(500).send("Error en el servidor");
        }
        if (row) {
            res.send(`<h1>Acceso Concedido</h1><p>Bienvenido, ${row.username}!</p>`);
        } else {
            res.send("<h1>Acceso Denegado</h1><p>Usuario o contraseña incorrectos.</p>");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor vulnerable corriendo en http://localhost:${PORT}`);
});