const Joi = require("joi").extend(require("@joi/date"));

const ProductSchema = {
  addProduct: Joi.object().keys({
    name: Joi.string()
      .required()
      .error(() => {
        throw {
          status: 400,
          message: "name is required",
        };
      }),
    description: Joi.string()
      .required()
      .error(() => {
        throw {
          status: 400,
          message: "description is required",
        };
      }),
    price: Joi.number()
      .required()
      .error(() => {
        throw {
          status: 400,
          message: "price is required",
        };
      }),
    asin: Joi.string()
      .required()
      .error(() => {
        throw {
          status: 400,
          message: "asin number is required",
        };
      }),
  }),
  
};

module.exports = ProductSchema;
