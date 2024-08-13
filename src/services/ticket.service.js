
import TicketDaoMongoDB from "../daos/mongodb/ticket.dao.js";

const ticketDao = new TicketDaoMongoDB();
export const create = async(amount, purchaser) => {

    try {
        const ticket = await ticketDao.create(amount, purchaser);
        if(!ticket) return false;
        return ticket;

    } catch(error) {
        console.log("Error in create ticket.service.js: ", error.message);
        
    }
   
}