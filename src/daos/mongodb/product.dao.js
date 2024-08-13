import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoBD {
  // CHEQUEAR QUE EL PAGINATION DEVUELVA [] SI NO HAY PRODUCTOS.
  async getProducts(method, limit = 10, page = 1, sort, title,) {
    try { 
      if(method == "POST") return await ProductModel.find();
      
      return await ProductModel.paginate(title, {
        page,
        limit,
        sort,
      });

    } catch(error) {
      console.log("Error in getProducts product.dao.js: ", error.message);      
    }
  }

  async createProduct(product) {
    try {
      return await ProductModel.create(product);
    } catch(error) {
      console.log("Error in createProduct product.dao.js: ", error.message);
    }
  }

  async getProductById(idProduct) {
    try {
        return await ProductModel.findById(idProduct);
    } catch(error) {
      console.log("Error in getProductById product.dao.js: ", error.message);
      
    }
  }

  async updateProduct(id, obj) {
    try {
      if(obj._id) return {status: "error", mssg: "The Id can't be modified"};
      return await ProductModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
    } catch(error) {
      console.log("Error in updateProduct product.dao.js: ", error.message);
      
    }
  }

  async deleteProduct(id) {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      console.log("Error in deleteProduct product.dao.js: ", error.message);
    }
  }
}
