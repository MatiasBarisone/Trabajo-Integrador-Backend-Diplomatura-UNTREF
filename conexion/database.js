// Importamos Sequelize desde la librería sequelize
const { Sequelize } = require("sequelize");

// Configuramos la conexión a la base de datos con Sequelize
const sequelize = new Sequelize("trailerflix", "root", "pZbPUZvawCgLjveWQevfWWkOCWJojtDP", {
  host: "junction.proxy.rlwy.net", // Servidor de la base de datos
  port: 26663, // Especifica el puerto de conexión a MySQL (cámbialo si es necesario)
  dialect: "mysql",  // Tipo de base de datos que estamos usando (MySQL)
  define: {
    timestamps: false, // Desactivar timestamps globalmente para todas las tablas
  },
  dialectOptions: {
    connectTimeout: 60000 // Aumenta el tiempo de espera de conexión si persisten los problemas
  }
});

// Autenticación de la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL database using Sequelize"); // Si la conexión es exitosa, muestra este mensaje
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err); // Si hay un error, lo muestra en la consola
  });

// Exportamos la instancia de Sequelize para que esté disponible en otros archivos
module.exports = sequelize;
