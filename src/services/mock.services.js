import { generateUser } from "../utils/generateUser.js";
import { MockUserModel } from "../daos/mongodb/models/mockUser.model.js";

export const createUsersMock = async (user, pets, count = 50) => {
    try {

      const amount = user ? user : count;

      const usersArray = [];
      for (let i = 0; i <= amount; i++) {

        usersArray.push(
          {
            password: "coder123",
            role: "admin",
            pets: []
          }
        );
        if(pets){
          for (let i = 0; i <= pets; i++) {
            usersArray.pets.push("newPet")
          }
        }
        
      }
      return await MockUserModel.create(usersArray);
    } catch (error) {
      throw new Error(error);
    }
  };