const express = require('express');
const productsRouter = require('./api/products');
const cartsRouter = require('./api/carts');

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');
const cartModel = require('../models/cartModel');

// Rutas para productos
router.get('/', async (req, res) => {
  try {
    const products = await productModel.getAllProducts(req.query.limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.pid);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = await productModel.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await productModel.updateProduct(req.params.pid, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    await productModel.deleteProduct(req.params.pid);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

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
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const quantity = req.body.quantity || 1; // Si no se especifica, se agrega 1 por defecto
      const updatedCart = await cartModel.addProductToCart(cartId, productId, quantity);
      res.json(updatedCart);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

module.exports = router;
