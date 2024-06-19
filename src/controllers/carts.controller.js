import * as service from "../services/cart.services.js";

export const getAll = async (req, res) => {
  try {
    const response = await service.getAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
  }
}

export const getById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await service.getById(cid);
    if(!cart) res.status(404).json({message: "Error: Cart Not Found"});
    else res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
};

export const create = async (req, res) => {
  try {
    const newProd = await service.create(req.body);
    if(!newProd) res.status(400).json({msg: 'Error create cart'});
    else res.json([newProd]);
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const productInCart = await service.addProductToCart(cid, pid);

    if(productInCart.status == "error") res.status(422).json({ message: `Error: ${productInCart.mssg}` });
    else res.status(201).json(productInCart.payload);

  } catch (error) {
    console.log(error);
  }
};

export const deleteProdToCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;

    const delProdToCart = await service.deleteProdToCart(
      cid,
      pid,
    );

    if (delProdToCart.status == "error") res.json({ message: `Error: ${delProdToCart.mssg}` });
    else res.json({message: `product ${pid} deleted to cart`});
  } catch (error) {
   console.log(error)
  }
};

export const update = async (req, res) => {
  try {
    const { cid } = req.params;
    const cartUpdated =  await service.update(cid, req.body);
    if(cartUpdated.status == "error") res.json({ message: `Error: ${cartUpdated.mssg}` });
    else res.status(201).json(cartUpdated.payload);
  } catch (error) {
    console.log(error)
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;

    const { quantity } = req.body;

    const  updateProdQuantity = await service.updateQuantity(
      cid,
      pid,
      quantity
    );
    if (updateProdQuantity.status == "error") res.json({ message: `Error: ${updateProdQuantity.mssg}` });
    else res.status(201).json(updateProdQuantity.payload.products);

  } catch (error) {
    next(error.message);
  }
};

export const clear = async (req, res) => {
  try {
    const { cid } = req.params;
    const cartClear = await service.clear(cid);

    if(cartClear.status == "error") res.json({ message: `Error: ${cartClear.mssg}` });
    else res.status(201).json(cartClear.payload);
  } catch (error) {
    console.log(error);
  }
}
