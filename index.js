const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');  // Importamos la librería JWT

const app = express();
const PORT = process.env.PORT || 10000; // Usa el puerto que Render asigna

const SECRET_KEY = 'tu_clave_secreta';  // Define una clave secreta para firmar los tokens
const REFRESH_SECRET_KEY = 'clave_secreta_refresh';  // Define una clave secreta para el refresh token

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

    // Generamos el access_token con un tiempo de expiración (por ejemplo, 1 hora)
    const access_token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    // Generamos un refresh_token, que normalmente tiene un tiempo de expiración más largo
    const refresh_token = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' }); // Expira en 7 días

    // Obtenemos la fecha de expiración del access_token en segundos
    const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 3600 segundos = 1 hora

    // Respondemos con el formato que deseas
    return res.status(200).json({
      data: {
        access_token,
        expires: expirationTime,
        refresh_token
      }
    });
  } else {
    // Si las credenciales son incorrectas
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
