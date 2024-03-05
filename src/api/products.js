const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');

// Listar todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productModel.getAllProducts(req.query.limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un producto por su ID
router.get('/:pid', async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.pid);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
  try {
    const newProduct = await productModel.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un producto existente
router.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await productModel.updateProduct(req.params.pid, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Eliminar un producto
router.delete('/:pid', async (req, res) => {
  try {
    await productModel.deleteProduct(req.params.pid);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = router;
