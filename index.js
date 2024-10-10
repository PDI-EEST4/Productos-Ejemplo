const express = require('express');
const cors = require('cors');
const port = 3000;

const app = express();

// Middlewares genéricos
app.use(cors());  // Para no tener problemas al hacer solicitudes en local
app.use(express.json());  // Para que express entienda json

// Rutas
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/auth', require('./routes/auth.routes'));


app.listen(port, () => {
  console.log(`App funcionando en http://localhost:${port}`);
});