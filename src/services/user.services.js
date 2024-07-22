import { __dirname } from '../utils/dirnameFunctions.js';
import ProductDaoFS from "../daos/filesystem/product.dao.js";

import { userModel } from '../daos/mongodb/models/user.model.js'
import ProductDaoMongoBD from "../daos/mongodb/product.dao.js";

const PERSISTENCE = process.env.PERSISTENCE;
let productDao;

if(PERSISTENCE === 'mongo') productDao = new ProductDaoMongoBD();
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

