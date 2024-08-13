import { __dirname } from '../../utils/dirnameFunctions.js';
import ProductDaoFS from "../filesystem/product.dao.js";
import { config } from '../../config/config.js';
import { userModel } from './models/user.model.js'
import ProductDaoMongoBD from "./product.dao.js";

export default class UserDaoMongoDB {

//   let productDao;
// if(config.PERSISTENCE === 'mongo') productDao = new ProductDaoMongoBD();
// else productDao = new ProductDaoFS(`${__dirname}/data/products.json`);

 getUserById = async (id) => {
    try {
   
      return await userModel.findOne({ id });

    } catch(error) {
      console.log("Error in GetUserById user.dao " + error.message);
    };
};

 getUserByEmail = async (emailUser) => {
  try {
    return await userModel.findOne({email: emailUser.email});
  } catch(error) {
    console.log("Error getUserByEmail user.dao.js" + error.message);
  };
};

 createUser = async (product) => {
  try {
    return await userModel.create(product);
  } catch(error) {
      console.log("Error in getUserByEmail user.dao.js " + error.message);
  }
}

 addCart = async (userId, cartId) => {
  try {
    const cartUpdate = await userModel.findByIdAndUpdate(
      { _id: userId },
      {$set: {cartId: cartId}},
      {new: true}
    )
    return cartUpdate;
  } catch(error) {
    console.log("Error in addCart user.dao.js " + error.message);
    
  }
}


}
