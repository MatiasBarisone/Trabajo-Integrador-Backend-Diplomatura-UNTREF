const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./database');
const Product = require('./product');

const app = express();

app.use(bodyParser.json());

// Manejo de errores de forma centralizada
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};

// Ruta para obtener todos los productos
app.get('/products', async (req, res, next) => {
  try {
    const products = await Product.find();
    console.log('Productos obtenidos:', products);
    res.json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    next({ status: 500, message: 'Error al obtener los productos' });
  }
});

// Ruta para obtener un producto por ID
app.get('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next({ status: 404, message: 'Producto no encontrado' });
    }
    console.log('Producto obtenido:', product);
    res.json(product);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    next({ status: 500, message: 'Error al obtener el producto' });
  }
});

// Ruta para buscar productos por nombre
app.get('/products/nombre/:nombre', async (req, res, next) => {
  try {
    const nombre = req.params.nombre;
    const products = await Product.find({ nombre: new RegExp(nombre, 'i') });
    if (products.length === 0) {
      return next({ status: 404, message: 'Productos no encontrados' });
    }
    console.log('Productos encontrados:', products);
    res.json(products);
  } catch (error) {
    console.error('Error al buscar productos por nombre:', error);
    next({ status: 500, message: 'Error al buscar productos por nombre' });
  }
});

// Ruta para agregar un nuevo producto
app.post('/products', async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log('Producto agregado:', newProduct);
    res.json({ status: 'Producto guardado' });
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    next({ status: 500, message: 'Error al agregar el producto' });
  }
});

// Ruta para modificar el precio de un producto
app.patch('/products/:id', async (req, res, next) => {
  try {
    const { precio } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { precio }, { new: true });
    if (!updatedProduct) {
      return next({ status: 404, message: 'Producto no encontrado' });
    }
    console.log('Producto actualizado:', updatedProduct);
    res.json({ status: 'Producto actualizado' });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    next({ status: 500, message: 'Error al actualizar el producto' });
  }
});

// Ruta para borrar un producto
app.delete('/products/:id', async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return next({ status: 404, message: 'Producto no encontrado' });
    }
    console.log('Producto eliminado:', deletedProduct);
    res.json({ status: 'Producto eliminado' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    next({ status: 500, message: 'Error al eliminar el producto' });
  }
});

// Middleware para manejar rutas no existentes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejar errores
app.use(errorHandler);

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Server on port 3000');
});
