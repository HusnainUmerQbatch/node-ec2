const User = require("../../models/user");
const { generateToken } = require("../../utlis/generatetoken")
const signUp = async ({ firstName, lastName, email, password }) => {
  let user;
  user = await User.findOne({ email });
  if (user) {
    throw {
      status:409,
      message: "User with email already Exist",
    };
  }
  
  user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (!user) {
    throw {
      status:400,
      message: "Error while creating new user",
    };
  }

  return {
    successs: true,
    message: "signUp success",
    user,
    token: generateToken(user.id),
  };
};
module.exports = signUp;
