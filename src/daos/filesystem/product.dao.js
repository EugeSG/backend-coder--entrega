import fs from "fs";
import { v4 as uuidv4 } from "uuid";


export default class ProductDaoFS {
  constructor(path) {
    this.path = path;
  }

  async getProducts(limit) {
    try {
      
      if (fs.existsSync(this.path)) {
        let products = await fs.promises.readFile(this.path, "utf8");
        if(products) {
          products = JSON.parse(products)
          if(limit) {
            products = products.slice(0, limit);
            console.log(products);
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
      let expectedProps = [
        "title",
        "description",
        "code",
        "price",
        "stock",
        "category"
      ];

      //Validate required fields
      const propsArray = (Object.keys(product));
      if (!expectedProps.every((i) => (propsArray.includes(i)))){
        return {status: "error", mssg: "One or more fields are missing"};
      };
        

      //Validate required values
      if (Object.values(product).includes(""))
        return {status: "error", mssg: "One or more fields are empty"};

      // Verify existing product
      const productsFile = await this.getProducts();
      if(productsFile.length != 0) {
        const productExist = productsFile.find(prod => prod.code == product.code);
        if(productExist) {
          return {status: "error", mssg: "The field 'Code' is already existing. Please change it and try again"};
          }
      }
      // Create new product
      product.id = uuidv4();
      if(!product.status) product.status = true;
      productsFile.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
      return {status: "success", payload: product};

    } catch(error) {
      console.log(error);
    }
  }


  async getProductById(idProduct) {
    try {
      const productsFile = await this.getProducts();

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
      const productsFile = await this.getProducts();
      productExist = { ...productExist, ...obj };
      console.log(productExist)
      const newArray = productsFile.filter((u) => u.id != id);
      console.log(newArray);
      newArray.push(productExist); 
      console.log(newArray);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return {status: "success", payload: productExist};

    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      console.log(id)
      //Validate Id
      const productExist = await this.getProductById(id);
      if(!productExist) return false;

    const products = await this.getProducts();
    const newArray = products.filter((u) => u.id != id);
    await fs.promises.writeFile(this.path, JSON.stringify(newArray));
    console.log(newArray);
    return productExist;
    } catch(error) {
      console.log(error)
    }
  }
}
