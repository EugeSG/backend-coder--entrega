
import CartDaoMondoDB from "../daos/mongodb/cart.dao.js";
import ProductDaoMongoBD from "../daos/mongodb/product.dao.js";
const cartDao = new CartDaoMondoDB();
const productDao = new ProductDaoMongoBD();

// import { __dirname } from '../utils.js';
// import CartDaoFS from "../daos/filesystem/cart.dao.js";
// const cartDao = new CartDaoFS(`${__dirname}/data/carts.json`);

export const getAll = async () => {
  try {
    return await cartDao.getCarts();
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (idCart) => {
  try {
    const cart =  await cartDao.getCartById(idCart);
    if(!cart) return false
    else return cart;
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

    // Validity Product
    const product = await productDao.getProductById(idProduct);
    if(!product) return {status: "error", mssg: "Product Not Found"};

    // Validity Cart
    const cartExist = await cartDao.getCartById(idCart);
    if(!cartExist) return {status: "error", mssg: "Cart Not Found"};

    const cart = await cartDao.addProductToCart(idCart, idProduct);
    return {status: "success", payload: cart};

  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProdToCart = async (idCart, idProduct) => {
  try {
    const existCart = await getById(idCart);
    if (!existCart) return {status: "error", mssg: "Cart Not Found"};

    const existProd = await productDao.getProductById(idProduct);
    if(!existProd) return {status: "error", mssg: "Product Not Found"};

    const existProdInCart = await cartDao.existProdInCart(idCart, idProduct);
    if (!existProdInCart) return {status: "error", mssg: "Product Not Found In Cart"};

    let response =  await cartDao.deleteProdToCart(idCart, idProduct);
    return {status: "success", payload: response};

  } catch (error) {
    console.log(error);
  }
  
};

export const update = async (idCart, obj) => {
  try {

    if(obj._id) return {status: "error", mssg: "The Id can't be modified"};
    const response =  await cartDao.updateCart(idCart, obj);
    if(!response) return {status: "error", mssg: "Something was wrong. Try again"}
    else return {status: "success", payload: response};

  } catch (error) {
    console.log(error);
  }
};

export const updateQuantity = async (idCart, idProduct, quantity) => {
  try {
    const existCart = await cartDao.getCartById(idCart);
    if (!existCart) return {status: "error", mssg: "Cart Not Found"};

    const existProdInCart = await cartDao.existProdInCart(idCart, idProduct);
    if (!existProdInCart) return {status: "error", mssg: "Product Not Found In Cart"};

    let cartUpdated =  await cartDao.updateQuantity(idCart, idProduct, quantity);
    if(cartUpdated) return {status: "success", payload: cartUpdated};

  } catch (error) {
    console.log(error);
  }
};

export const clear = async (idCart) => {
  try {
    const cart = await cartDao.getCartById(idCart);
    if (!cart) return {status: "error", mssg: "Cart Not Found"};

    const cartClear = await cartDao.clearCart(idCart);

    if(cartClear) return {status: "success", payload: cartClear};
    else return {status: "error", mssg: "Algo salió mal, inténtelo de nuevo"};

  } catch (error) {
    console.log(error);
  }
}
