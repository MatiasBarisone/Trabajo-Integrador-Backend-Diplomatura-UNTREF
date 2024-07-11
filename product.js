// Importa el módulo 'mongoose'
const mongoose = require('mongoose');

// Extrae el constructor Schema del módulo 'mongoose'
const { Schema } = mongoose;

// Define el esquema para el modelo 'Product'
const ProductSchema = new Schema({
  codigo: { type: Number, required: true },   // Campo 'codigo' de tipo número, obligatorio
  nombre: { type: String, required: true },   // Campo 'nombre' de tipo cadena, obligatorio
  precio: { type: Number, required: true },   // Campo 'precio' de tipo número, obligatorio
  categoria: { type: String, required: true } // Campo 'categoria' de tipo cadena, obligatorio
});

// Exporta el modelo 'Product' basado en 'ProductSchema'
module.exports = mongoose.model('Product', ProductSchema);
