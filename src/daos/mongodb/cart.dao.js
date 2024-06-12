import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { CartModel } from "./models/cart.model.js";
import { ProductModel } from "./models/product.model.js";

export default class CartDaoMondoDB {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            return await CartModel.find(); 
        } catch (error) {
            console.log(error);
        }
    };

    async createCart(obj) {
        try {
            return await CartModel.create(obj);
        } catch (error) {
            console.log(error);
        }
    }

    // las calback por ahora funcionan mal
    async getCartById(idCart) {
        try {
            return await CartModel.findById(idCart, function(err, doc){
                if(!doc) return ["Error", "Product Not Found"]
                else return 'ok';
            });
        } catch (error) {
            console.log(error);
        }
    }

    
    async addProductToCart(idCart, idProduct) {
        try {
            // Validity Product

            const product = await ProductModel.findById(idProduct, function(err, doc){
                if(!doc) return ["Error", "Product Not Found"];
            });

            // Validity Cart
            let obj = {
                product: idProduct,
            };
            const cart = await CartModel.findById(idCart, function(err, doc){
                if(doc) {
                    doc.products.forEach(prod => {
                        if(prod._id == idProduct) {
                            obj.quantity = prod.quantity + 1;
                        } else {
                            obj.quantity = 1;
                        }
                    });
                } else {
                    return ["Error", "Cart Not Found"];
                }
            });

            const updateResponse = await CartModel.findByIdAndUpdate(idCart, {
                $push: {
                    products: obj
                }
            }, { new: true } );

            return [updateResponse];

        } catch (error) {
            console.log(error);
        }
    }
}