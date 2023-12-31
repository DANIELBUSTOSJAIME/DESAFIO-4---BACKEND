import { promises as fs } from "fs";
import Product from "./Product.js";

const path = "./product.json";

export default class ProductManager {
  constructor() {
    this.products = [];
  }
  // METODO GET PRODUCT
  async getProducts() {
    const products = JSON.parse(await fs.readFile(path, "utf-8"));
    return products;
  }
  // METODO GET PRODUCT BY ID
  async getProductById(id) {
    const products = JSON.parse(await fs.readFile(path, "utf-8"));
    const prod = products.find((product) => product.id === id);
    if (prod) {
      return prod;
    } else {
      return "El ID ingresado no existe"
    }
  }

  // METODO ADD PRODUCT CON VALIDACION DE CODE
  async addProduct(product) {
    const products = JSON.parse(await fs.readFile(path, "utf-8"));
    const productExist = products.find((prod) => prod.code === product.code);
  
    if (productExist) {
      return "El código agregado ya existe";
    } else {
      const maxId = Math.max(...products.map((prod) => prod.id));
      Product.IdIncremented = maxId + 1;
  
      const newProduct = new Product(
        product.title,
        product.description,
        product.price,
        product.thumbnail,
        product.code,
        product.stock,
        product.status,
        product.category
      );

      products.push(newProduct);
      await fs.writeFile(path, JSON.stringify(products));
    }
  }

  // METODO UPDATE PRODUCT
  async updateProduct(id, updatedProduct) {
    const products = JSON.parse(await fs.readFile(path, "utf-8"));
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index].title = updatedProduct.title;
      products[index].description = updatedProduct.description;
      products[index].price = updatedProduct.price;
      products[index].thumbnail = updatedProduct.thumbnail;
      products[index].code = updatedProduct.code;
      products[index].stock = updatedProduct.stock;
      products[index].status = updatedProduct.status;
      products[index].category = updatedProduct.category
      await fs.writeFile(path, JSON.stringify(products));
      return "El producto ha sido actualizado"
    } else {
      return "El ID ingresado no existe";
    }
  }

  // METODO DELETE PRODUCT
  async deleteProduct(id) {
    const products = JSON.parse(await fs.readFile(path, "utf-8"));
    const productDelete = products.find((prod) => prod.id === id);
    if (productDelete) {
      await fs.writeFile(path, JSON.stringify(products.filter(prod => prod.id != id)));
      return "El producto ha sido eliminado"
    } else {
      return "El ID ingresado no existe";
    }
  }
}