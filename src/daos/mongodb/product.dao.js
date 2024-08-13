import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoBD {
  // CHEQUEAR QUE EL PAGINATION DEVUELVA [] SI NO HAY PRODUCTOS.
  async getProducts(method, limit = 10, page = 1, sort, title,) {
    try {
      
      if(method == "POST") {
        return await ProductModel.find();
      }
      
      const filterTitle = title ? { title: title } : {};

      let sortOrder = {};
      if (sort)
        sortOrder.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null; 
      return await ProductModel.paginate(filterTitle, {
        page: page,
        limit:limit,
        sort: sortOrder,
      });
    } catch {
      console.log(error);
    }
  }

  async createProduct(product) {
    try {
      return await ProductModel.create(product);
    } catch(error) {
        console.log(error);
    }
  }

  async getProductById(idProduct) {
    try {
        return await ProductModel.findById(idProduct);
    } catch(error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      if(obj._id) return {status: "error", mssg: "The Id can't be modified"};
      return await ProductModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
    } catch(error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
