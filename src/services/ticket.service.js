
import { ticketModel } from "../daos/mongodb/models/ticket.model.js";
import { v4 as uuid } from "uuid";

export const create = async(amount, purchaser) => {
    try {
        return await ticketModel.create({
            code: uuid(),
            purchase_datetime: new Date(),
            amount,
            purchaser
          });
    } catch(error) {
        console.log(error);
        
    }
   
}