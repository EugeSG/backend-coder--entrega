import fs from "fs";
import { v4 as uuidv4 } from "uuid";


export default class ProductDaoFS {
  constructor(path) {
    this.path = path;
  }

  async getProducts(method, limit) {
    try {
      
      if (fs.existsSync(this.path)) {
        let products = await fs.promises.readFile(this.path, "utf8");
        if(products) {
          products = JSON.parse(products)
          if(limit) {
            products = products.slice(0, limit);
          }
        return products;
        }
        else return [];
      } else return [];
    } catch (error) {
      console.log(error);
    }
  };

  async createProduct(product) {
    try {
    
      product.id = uuidv4();

      productsFile.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
      return product;

    } catch(error) {
      console.log(error);
    }
  }


  async getProductById(idProduct) {
    try {
      const productsFile = await this.getProducts("fileSystem");

      // Find id
      const product = productsFile.find(prod => prod.id == idProduct);
      if (!product) return false;
      else return product;

    } catch(error){
      console.log(error)
    }
    
  }

  async updateProduct(id, obj) {
    try {
      // Verify if Id Exists
      let productExist = await this.getProductById(id);
      if (!productExist) return false;
      //Verify Id in body
      if(obj.id) return {status: "error", mssg: "The Id can't be modified"};

      // Update
      const productsFile = await this.getProducts("fileSystem");
      productExist = { ...productExist, ...obj };
      const newArray = productsFile.filter((u) => u.id != id);
      newArray.push(productExist); 
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return {status: "success", payload: productExist};

    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      //Validate Id
      const productExist = await this.getProductById(id);
      if(!productExist) return false;

    const products = await this.getProducts("fileSystem");
    const newArray = products.filter((u) => u.id != id);
    await fs.promises.writeFile(this.path, JSON.stringify(newArray));
    return productExist;
    } catch(error) {
      console.log(error)
    }
  }
}
