const fs = require('fs').promises;
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');

class ProductModel {
  async getAllProducts(limit) {
    try {
      const data = await fs.readFile(productsFilePath, 'utf-8');
      let products = JSON.parse(data);
      if (limit) {
        products = products.slice(0, limit);
      }
      return products;
    } catch (error) {
      throw new Error('No se pudieron obtener los productos');
    }
  }

  async getProductById(id) {
    try {
      const data = await fs.readFile(productsFilePath, 'utf-8');
      const products = JSON.parse(data);
      const product = products.find(p => p.id === id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error) {
      throw new Error('No se pudo obtener el producto');
    }
  }

  async addProduct(productData) {
    try {
      const data = await fs.readFile(productsFilePath, 'utf-8');
      const products = JSON.parse(data);
      
      // Validación para evitar la creación de productos duplicados basados en el código del producto
      const existingProduct = products.find(p => p.code === productData.code);
      if (existingProduct) {
        throw new Error('Ya existe un producto con el mismo código');
      }
      const newProduct = { id: products.length + 1, ...productData };
      products.push(newProduct);
      await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
      return newProduct;
    } catch (error) {
      throw new Error('No se pudo agregar el producto');
    }
  }

  async updateProduct(id, updatedData) {
    try {
      const data = await fs.readFile(productsFilePath, 'utf-8');
      let products = JSON.parse(data);
      const index = products.findIndex(p => p.id === id);
      if (index === -1) {
        throw new Error('Producto no encontrado');
      }
      products[index] = { ...products[index], ...updatedData };
      await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
      return products[index];
    } catch (error) {
      throw new Error('No se pudo actualizar el producto');
    }
  }

  async deleteProduct(id) {
    try {
      const data = await fs.readFile(productsFilePath, 'utf-8');
      let products = JSON.parse(data);
      products = products.filter(p => p.id !== id);
      await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
    } catch (error) {
      throw new Error('No se pudo eliminar el producto');
    }
  }
}

module.exports = new ProductModel();
