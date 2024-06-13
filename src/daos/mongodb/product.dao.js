import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoBD {
  // CHEQUEAR QUE EL PAGINATION DEVUELVA [] SI NO HAY PRODUCTOS.
  async getProducts(limit = 10, page = 1, sort, title) {
    try {
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
      let expectedProps = [
        "title",
        "description",
        "code",
        "price",
        "stock",
        "category",
      ];

      //Validate required fields
      const propsArray = Object.keys(product);

      if (!expectedProps.every((i) => propsArray.includes(i))) {
        return {status: "error", mssg: "One or more fields are missing"};
      }
        

      //Validate required values
      if (Object.values(product).includes(""))
        return {status: "error", mssg: "One or more fields are empty"};

      // Verify existing product
      let productExist = await this.getProducts();
      if(productExist.length != 0) {
        productExist = productExist.docs.find(prod => prod.code == product.code);
        if(productExist) {
          return {status: "error", mssg: "The field 'Code' is already existing. Please change it and try again"}
          }
      }

      // Create new product
      if(!product.status) product.status = true;
      const response =  await ProductModel.create(product);
      return {status: "success", payload: response}

    } catch(error) {
        console.log(error);
    }
  }

  async getProductById(idProduct) {
    try {
        const prod = await ProductModel.findById(idProduct);
        return prod;
    } catch(error) {
      console.log(error);
    }
  }

  async deleteProduct() {
    
  }
}
