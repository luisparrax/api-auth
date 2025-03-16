const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para recibir email y password
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  if (email === 'testuser@gogodev.net' && password === '12345678') {
    return res.status(200).json({ message: 'Autenticación exitosa' });
  } else {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
