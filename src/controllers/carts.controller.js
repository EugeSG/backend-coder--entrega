import * as service from "../services/cart.services.js";

export const getById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.getById(cid);
    // if(!cart) res.status(404).json({msg: 'Cart Not Found'});
    // else 
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const newProd = await service.create(req.body);
    if(!newProd) res.status(404).json({msg: 'Error create cart'});
    else res.json([newProd]);
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const productInCart = await service.addProductToCart(cid, pid);

    // if(productInCart[0] == "Error") {
    //     res.status(422).json( { message: productInCart[1]});
    // }
    // else 
    console.log(productInCart);
    res.status(201).json(productInCart);

  } catch (error) {
    next(error);
  }
};
