const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');  // Importamos la librería JWT

const app = express();
const PORT = process.env.PORT || 10000; // Usa el puerto que Render asigna

const SECRET_KEY = 'tu_clave_secreta';  // Define una clave secreta para firmar los tokens

app.use(cors());
app.use(bodyParser.json());

// Ruta de login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  // Verificamos las credenciales
  if (email === 'admin@admin.com' && password === '123456') {
    // Si las credenciales son correctas, generamos el token
    const payload = { email };  // Aquí podemos poner más información que queramos incluir en el token

    // Generamos el token con un tiempo de expiración (por ejemplo, 1 hora)
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    // Respondemos con el token generado
    return res.status(200).json({ message: 'Autenticación exitosa', token });
  } else {
    // Si las credenciales son incorrectas
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

