import ProductDaoMongoBD from "../daos/mongodb/product.dao.js";
const productDao = new ProductDaoMongoBD();

// import { __dirname } from '../utils.js';
// import ProductDaoFS from "../daos/filesystem/product.dao.js";
// const productDao = new ProductDaoFS(`${__dirname}/data/products.json`);

export const getAll = async (limit, page, sort, title) => {
  try {
    return await productDao.getProducts(limit, page, sort, title);
  } catch (error) {
    console.log(error);
  }
};

export const create = async (product) => {
  try {
    const newProd = await productDao.createProduct(product);
    if (!newProd) return false;
    else return newProd;
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
