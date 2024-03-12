const express = require('express');
const router = express.Router();
const productModel = require('./models/productModel');

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
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await productModel.updateProduct(req.params.pid, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un producto
router.delete('/:pid', async (req, res) => {
  try {
    await productModel.deleteProduct(req.params.pid);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
