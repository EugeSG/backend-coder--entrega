import Joi from "joi";

export const userDto = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number(),
  password: Joi.string().required(),
  cartId: Joi.string(),
  role: Joi.string()
});

export const userPrvacyDto = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string().email()
});