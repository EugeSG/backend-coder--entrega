import * as mockService from "../services/mock.services.js";

export const createUsers = async (req, res, next) => {
    try {
      const { count } = req.params;
      const { user } = req.params;
      const { pets } = req.params
      const response = await mockService.createUsersMock(user, pets, count);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };