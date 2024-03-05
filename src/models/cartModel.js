const fs = require('fs').promises;
const path = require('path');

const cartsFilePath = path.join(__dirname, '../data/carrito.json');

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

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const data = await fs.readFile(cartsFilePath, 'utf-8');
      const cart = JSON.parse(data);
      const productIndex = cart.products.findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ id: productId, quantity });
      }
      await fs.writeFile(cartsFilePath, JSON.stringify(cart, null, 2));
      return cart;
    } catch (error) {
      throw new Error('No se pudo agregar el producto al carrito');
    }
  }
}

module.exports = new CartModel();
