import { MockUserModel } from "../daos/mongodb/models/mockUser.model.js";
import { generateUser } from "../utils/generateMocks.js";

export const createUsersMock = async (userCount, petsCount, count = 50) => {
    try {

      const amount = userCount ? userCount : count;

      let usersArray = [];
      for (let i = 0; i < amount; i++) {
        const user = petsCount ? await generateUser(petsCount) : await generateUser();
        usersArray.push(user);
      }
      
      return await MockUserModel.create(usersArray)

    } catch (error) {
      throw new Error(error);
    }
  };