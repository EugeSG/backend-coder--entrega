import { __dirname } from '../utils/dirnameFunctions.js';
import ProductDaoFS from "../daos/filesystem/product.dao.js";
import { config } from '../config/config.js';
import { userModel } from '../daos/mongodb/models/user.model.js'
import ProductDaoMongoBD from "../daos/mongodb/product.dao.js";

let productDao;
if(config.PERSISTENCE === 'mongo') productDao = new ProductDaoMongoBD();
else productDao = new ProductDaoFS(`${__dirname}/data/products.json`);

export const getUserById = async (id) => {
    try {
      return await userModel.findOne({ id });

    } catch(error) {
      console.log("Error Get user by Id " + error.message);
    };
};

export const getUserByEmail = async (emailUser) => {
  try {
    return await userModel.findOne({email: emailUser.email});
  } catch(error) {
    console.log("Erro get User By Email" + error.message);
  };
};

export const createUser = async (product) => {
  try {
    return await userModel.create(product);
  } catch(error) {
      console.log("Error Create User " + error.message);
  }
}

export const addCart = async (userId, cartId) => {
  try {
    const cartUpdate = await userModel.findByIdAndUpdate(
      { _id: userId },
      {$set: {cartId: cartId}},
      {new: true}
    )
    return cartUpdate;
  } catch(error) {
    console.log("Service Error Add Cart " + error.message);
    
  }
}

