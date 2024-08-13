import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { CartModel } from "./models/cart.model.js";

import ProductDaoMongoBD from "./product.dao.js";
const productDao = new ProductDaoMongoBD();

export default class CartDaoMondoDB {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            return await CartModel.find().populate("products.product"); 
        } catch (error) {
            console.log("Error in getCarts: ", error.message);
        }
    };

    async createCart(obj) {
        try {
            return await CartModel.create(obj);
        } catch (error) {
            console.log("Error in createCart: ", error.message);
        }
    }

    async getCartById(idCart) {
        try {
            return await CartModel.findById(idCart).populate("products.product");
        } catch (error) {
            console.log("Error in getCartById: ", error.message);
        }
    }

    async existProdInCart(idCart, idProduct){
        try {
          
          const cart = await CartModel.findOne({
            _id: idCart,
            products: { $elemMatch: { product: idProduct } }
          });

          let product = null;
          if(cart){
            product = cart.products?.filter(prod => prod.product._id == idProduct)
          }
          
          return product;
        } catch (error) {
          console.log("Error in existProdInCart: ", error.message);
        }
      }
    
    async addProductToCart(idCart, idProduct) {
        try {
            
            // Exist prod in cart?
            const existProdInCart = await this.existProdInCart(idCart, idProduct);
            let response;

            if(existProdInCart){

                response = await CartModel.findOneAndUpdate(
                  { _id: idCart, 'products.product': idProduct },
                  { $set: { 'products.$.quantity': existProdInCart[0].quantity + 1 } },
                  { new: true }
                );
              } else {
                response = await CartModel.findByIdAndUpdate(
                  idCart,
                  { $push: { products: { product: idProduct } } },
                  { new: true }
                )
              }

              return response;
        } catch (error) {
            console.log("Error in addProductToCart: ", error.message);
        }
    }

    async deleteProdToCart(idCart, idProduct) {
        try {
          
          return await CartModel.findByIdAndUpdate(
            { _id: idCart },
            { $pull: { products: { product: idProduct } } },
            { new: true }
          )
        } catch (error) {
          console.log("Error in deleteProdToCart: ", error.message);
        }
    }

    async updateCart(idCart, obj) {
        try {

            const response = await CartModel.findByIdAndUpdate(idCart, obj, {
            new: true,
          });
          return response;

        } catch (error) {
          console.log("Error in updateCart: ", error.message);
        }
      }

      async updateQuantity(idCart, idProduct, quantity) {
        try {
          const cart = await CartModel.findOneAndUpdate(
            { _id: idCart, 'products.product': idProduct },
            { $set: { 'products.$.quantity': quantity } },
            { new: true }
          );

          return cart;
        } catch (error) {
          console.log("Error in updateQuantity: ", error.message);
        }
      }

      async clearCart(idCart) {
        try {
          return await CartModel.findOneAndUpdate({_id: idCart}, {$set: {products: []}}, {new: true})
        } catch (error) {
          console.log("Error in clearCart: ", error.message);
        }
      }
}