const fs = require('fs').promises;
const path = require('path');

const cartsFilePath = path.join(__dirname, './data/carrito.json');

class CartModel {
  async createCart() {
    try {
      const newCart = { id: Date.now(), products: [] };
      await fs.writeFile(cartsFilePath, JSON.stringify(newCart, null, 2));
      return newCart;
    } catch (error) {
      throw new Error('No se pudo crear el carrito');
    }
  }

  async getCartById(cartId) {
    try {
      const data = await fs.readFile(cartsFilePath, 'utf-8');
      const cart = JSON.parse(data);
      return cart;
    } catch (error) {
      throw new Error('No se pudo obtener el carrito');
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cartData = await fs.readFile(cartFilePath, 'utf-8');
      let cart = JSON.parse(cartData);
      
      // Verificar si el producto ya está en el carrito
      const productIndex = cart.products.findIndex(item => item.id === productId);
      if (productIndex !== -1) {
        // Incrementar la cantidad si el producto ya está en el carrito
        cart.products[productIndex].quantity++;
      } else {
        // Agregar el producto al carrito si no está presente
        cart.products.push({ id: productId, quantity: 1 });
      }

      await fs.writeFile(cartFilePath, JSON.stringify(cart, null, 2));
      return cart;
    } catch (error) {
      throw new Error('No se pudo agregar el producto al carrito');
    }
  }
}

module.exports = new CartModel();
