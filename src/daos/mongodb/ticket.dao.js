
import { ticketModel } from "./models/ticket.model.js";
import { v4 as uuid } from "uuid";

export default class TicketDaoMongoDB {

    create = async(amount, purchaser) => {
        try {
            return await ticketModel.create({
                code: uuid(),
                purchase_datetime: new Date(),
                amount,
                purchaser
              });
        } catch(error) {
            console.log("Error in create ticket.dao.js: ", error.message);
            
        }
       
    }
}
