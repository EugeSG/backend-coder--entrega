import { __dirname } from '../utils/dirnameFunctions.js';
import ProductDaoFS from "../daos/filesystem/product.dao.js";
import { config } from '../config/config.js';
import { userModel } from '../daos/mongodb/models/user.model.js'
import ProductDaoMongoBD from "../daos/mongodb/product.dao.js";
import UserDaoMongoDB from "../daos/mongodb/user.dao.js";

let userDao = new UserDaoMongoDB();
// if(config.PERSISTENCE === 'mongo') userDao = new UserDaoMongoDB();
// else userDao = new UserDaoFS(`${__dirname}/data/products.json`);

export const getUserById = async (id) => {
    try {
      const user = await userDao.getUserById(id)
      if(!user) return false;
      return user;

    } catch(error) {
      console.log("Error Get user by Id " + error.message);
    };
};

export const getUserByEmail = async (emailUser) => {
  try {
    let user = await userDao.getUserByEmail(emailUser);
    if(!user) return false;
    return user;
  } catch(error) {
    console.log("Error get User By Email" + error.message);
  };
};

export const createUser = async (product) => {
  try {

    // Check if the email already exists
    let productWithSameEmail = await userDao.getUserByEmail(product.email);
    
    if(productWithSameEmail) {
      return {
        error: "The email already exists"
      }
    };

    let user =  await userDao.createUser(product);
    if(!user) return false;
    return user;
  } catch(error) {
      console.log("Error in createUser user.service.js " + error.message);
  }
}

export const addCart = async (userId, cartId) => {
  try {
    const cartUpdate = await userDao.addCart(userId, cartId);
    if(!cartUpdate) return false;
    return cartUpdate;
  } catch(error) {
    console.log("Error in addCart user.service.js " + error.message);
    
  }
}

