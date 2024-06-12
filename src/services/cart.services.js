
import CartDaoMondoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMondoDB();

// import { __dirname } from '../utils.js';
// import CartDaoFS from "../daos/filesystem/cart.dao.js";
// const cartDao = new CartDaoFS(`${__dirname}/data/carts.json`);

export const getById = async (id) => {
  try {
    return await cartDao.getCartById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (obj) => {
  try {
    return await cartDao.createCart(obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const addProductToCart = async (idCart, idProduct) => {
  try {
    return await cartDao.addProductToCart(idCart, idProduct)
  } catch (error) {
    throw new Error(error);
  }
};
