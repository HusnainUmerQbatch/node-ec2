const Joi = require("joi").extend(require("@joi/date"));

const UserSchema = {
  signUp: Joi.object().keys({
    firstName: Joi.string()
      .required()
      .error(() => {
        throw {
          status: 400,
          message: "firstName is required",
        };
      }),
    lastName: Joi.string()
      .required()
      .error(() => {
        throw {
          status: 400,
          message: "lastName is required",
        };
      }),
    email: Joi.string()
      .email()
      .required()
      .error(() => {
        throw {
          status: 400,
          message: "email is required",
        };
      }),
  }),
  login: Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .error(() => {
        throw {
          status: 400,
          message: "email is required",
        };
      }),
      password: Joi.string()
      .min(6)
      .required()
      .error(() => {
        throw {
          status: 400,
          message: "plz provide valid password",
        };
      }),
  }),
};

module.exports = UserSchema;
