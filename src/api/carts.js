const express = require('express');
const router = express.Router();
const cartModel = require('./models/cartModel');

// Crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartModel.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar los productos de un carrito específico
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartModel.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

// Agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    // Aquí llamamos al método que verifica la existencia del producto antes de agregarlo al carrito
    const cart = await cartModel.addProductToCart(cid, pid);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
