
import ProductDaoMongoBD from "../daos/mongodb/product.dao.js";
import { __dirname } from '../utils/dirnameFunctions.js';
import ProductDaoFS from "../daos/filesystem/product.dao.js";
import config from "../config/config.js";
// import { __dirname } from '../utils.js';
// import ProductDaoFS from "../daos/filesystem/product.dao.js"; 


let productDao;
if(config.PERSISTENCE === 'mongo')productDao = new ProductDaoMongoBD();
else productDao = new ProductDaoFS(`${__dirname}/data/products.json`);



export const getAll = async (limit, page, sort, title) => {
  try {
    return await productDao.getProducts(limit, page, sort, title);
  } catch (error) {
    console.log(error);
  }
};

export const create = async (product) => {
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
      return { status: "error", mssg: "One or more fields are missing" };
    }

    //Validate required values
    if (Object.values(product).includes(""))
      return { status: "error", mssg: "One or more fields are empty" };

    // Verify existing product
    let productExist = await productDao.getProducts();
    if (productExist.length != 0) {
      productExist = productExist.docs.find(
        (prod) => prod.code == product.code
      );
      if (productExist) {
        return {
          status: "error",
          mssg: "The field 'Code' is already existing. Please change it and try again",
        };
      }
    }

    // Add status
    if (!product.status) product.status = true;
    const newProd = await productDao.createProduct(product);

    if (!newProd)
      return { status: "error", mssg: "Something was wrong. Try again" };
    else return { status: "success", payload: newProd };

  } catch (error) {
    console.log(error);
  }
};

export const getById = async (idProduct) => {
  try {
    const prod = await productDao.getProductById(idProduct);
    if (!prod) return false;
    else return prod;
  } catch (error) {}
};

export const update = async (idProduct, product) => {
  try {
    const prodUpdated = await productDao.updateProduct(idProduct, product);
    if (!prodUpdated) return false;
    else return prodUpdated;
  } catch (error) {}
};

export const remove = async (idProduct) => {
  try {
    const prodDeleted = await productDao.deleteProduct(idProduct);
    if (!prodDeleted) return false;
    else return prodDeleted;
  } catch (error) {
    console.log(error);
  }
};
