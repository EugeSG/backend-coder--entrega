import Joi from "joi";

export const productDto = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  code: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  category: Joi.string().required(),
  status: Joi.boolean(),
  thumbnails: Joi.string(),
});