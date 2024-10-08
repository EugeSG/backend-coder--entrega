import * as service from "../services/cart.services.js";
import { create as createTicket } from "../services/ticket.service.js";
import { update as updateProd } from "../services/product.service.js";
import { addCart } from "../services/user.services.js";


export const getAll = async (req, res) => {
  try {
    const response = await service.getAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
}

export const getById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await service.getById(cid);
    if(!cart) res.status(404).json({ status: "Error", message: "Error: Cart Not Found"});
    else res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const userId = req.user[0]._id
    const newProd = await service.create(req.body);
    if(!newProd) res.status(400).json({status: "Error", message: 'Error create cart'});
    else {
      const addCartInUser = await addCart(userId, newProd._id)
      if(!addCartInUser) res.status(400).json({status: "Error", message: "Se creó el carrito pero no se pudo asignar al usuario"});
      else res.json([newProd])
    };
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const productInCart = await service.addProductToCart(cid, pid);

    if(productInCart.status == "error") res.status(422).json({ status: "Error", message: productInCart.mssg });
    else res.status(201).json(productInCart.payload);

  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
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

    if (delProdToCart.status == "error") res.json({status: "Error", message: delProdToCart.mssg });
    else res.json({message: `product ${pid} deleted to cart`});
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { cid } = req.params;
    const cartUpdated =  await service.update(cid, req.body);
    if(cartUpdated.status == "error") res.json({ status: "Error", message: cartUpdated.mssg });
    else res.status(201).json(cartUpdated.payload);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
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
    if (updateProdQuantity.status == "error") res.json({ status: "Error",message: updateProdQuantity.mssg });
    else res.status(201).json(updateProdQuantity.payload.products);

  } catch (error) {
    next(error.message);
  }
};

export const clear = async (req, res) => {
  try {
    const { cid } = req.params;
    const cartClear = await service.clear(cid);

    if(cartClear.status == "error") res.json({ status: "Error", message: cartClear.mssg });
    else res.status(201).json(cartClear.payload);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
}

export const finishPurchase = async (req, res) => {
  try {
    
    const { cid } = req.params;
    const cart = await service.getById(cid);
    
    if(!cart){
      return res.status(404).json({ status: "Error",message: "Cart Not Found"});
    }

    const productsInPurchase = [];
    let productsWithoutStock = '';
    let ticket = 'No se pudo realizar la compra';

    try {
    cart.products.forEach(async (product) => {
      
      if (product.product.stock < product.quantity) {
          productsWithoutStock += product.product._id + ', ';
          return 
      } else {
          productsInPurchase.push(product);
          
          await service.deleteProdToCart(cart._id, product.product._id );
 
          let productStock = {
            stock: product.product.stock - product.quantity
          };
          await updateProd(product.product._id, productStock);  
      }
    });

    if(productsWithoutStock.length !== 0) {
      res.status(400).json({ status: "Error", message: ` Los siguientes productos no tienen stock suficiente: ${productsWithoutStock}` });
    } else if(productsInPurchase.length !== 0) {
      
      const amount = productsInPurchase.reduce((acc, curr) => acc + curr.quantity * curr.product.price, 0)
      ticket = await createTicket(amount, req.user[0]._id);

      if(!ticket){ 
        return res.status(400).json({ status: "Error", message: "Hubo un error al crear el ticket" });
      }

      res.status(200).json({
        message: "Compra finalizada",
        ticket
      });
    }



    } catch(error) {
      res.status(500).json({ status: "Error", message: error.message }); 
    } 

  } catch(error) {
    console.log(error);
  }
}
