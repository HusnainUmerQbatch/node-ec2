const JwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const User = require("../models/user");

var headerExtractor = function (req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    let token = req.headers.authorization.split(" ")[1];
    return token;
  }
};
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: headerExtractor,
      secretOrKey: process.env.SECRET_KEY,
    },
    async function (jwtPayload, done) {
      const user = await User.findById(jwtPayload.id);
      if (user) {
        return done(null, user);
      }

      return done(new Error("uncaught error! try again later"), null);
    }
  )
);

const checkRole = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (user.role == "seller") {
      next();
    } else {
      res
        .status(401)
        .send({ message: "you are not authorized to perform this task" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ ...error });
  }
};

module.exports = {
  passport,
  checkRole,
};
