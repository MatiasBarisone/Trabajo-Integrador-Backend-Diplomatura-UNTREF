// Importa el módulo 'mongoose'
const mongoose = require('mongoose');

// URI de conexión a la base de datos MongoDB Atlas
const uri = 'mongodb+srv://matiasbarisone:A5gXKcCV6nSK4kmf@cluster0.efye5yu.mongodb.net/computacion?retryWrites=true&w=majority';

// Conecta a MongoDB usando Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,          // Usa el nuevo parser de URL
  useUnifiedTopology: true        // Usa el nuevo mecanismo de administración de conexiones
})
.then(() => console.log('DB is connected')) // Mensaje de éxito si la conexión es exitosa
.catch(err => {
  console.error('Connection error', err);   // Muestra el error si la conexión falla
  process.exit(1); // Salir del proceso si hay un error de conexión
});
