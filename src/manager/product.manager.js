import fs from "fs";
import { v4 as uuidv4 } from "uuid";


export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        if(products) return JSON.parse(products)
        else return [];
      } else return [];
    } catch (error) {
      console.log(error);
    }
  };

  async createProduct(product) {
    try {
      let expectedProps = [
        "title",
        "description",
        "code",
        "price",
        "status",
        "stock",
        "category"
      ];

      //Validate required fields
      const propsArray = (Object.keys(product));
      if (!expectedProps.every((i) => (propsArray.includes(i)))){
        return ["Error", "One or more fields are missing"];
      }
        

      //Validate required values
      if (Object.values(product).includes(""))
        return ["Error", "One or more fields are empty"];

      // Verify existing product
      const productsFile = await this.getProducts();
      if(productsFile.length != 0) {
        const productExist = productsFile.find(prod => prod.code == product.code);
        if(productExist) {
          return ["Error", "The field 'Code' is already existing. Please change it and try again"];
          }
      }
      // Create new product
      product.id = uuidv4();
      productsFile.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
      return product;

    } catch(error) {
      console.log(error);
    }
  }


  async getProducById(idProduct) {
    try {
      const productsFile = await this.getProducts();

      // Find id
      const product = productsFile.find(prod => prod.id == idProduct);
      if (!product) return ["Error", "Product Not Found"];
      else return product;

    } catch(error){
      console.log(error)
    }
    
  }

  async updateProduct(obj, id) {
    try {
      // Verify if Id Exists
      let productExist = await this.getProducById(id);
      if (!productExist) return ["Error", "Product Not Found"];

      //Verify Id in body
      if(obj.id) return ["Error", "The Id can't be modified"];

      // Update
      const productsFile = await this.getProducts();
      productExist = { ...productExist, ...obj };
      const newArray = productsFile.filter((u) => u.id !== id);
      newArray.push(productExist)
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return productExist;

    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      //Validate Id
      const productExist = await this.getProducById(id);
      if(!productExist) return ["Error", "Product Not Found"];

    const products = await this.getProducts();
    const newArray = products.filter((u) => u.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(newArray));
    return productExist;
    } catch(error) {
      console.log(error)
    }
  }
}
