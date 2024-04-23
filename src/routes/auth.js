const express = require("express");
const router = express.Router();
const { login, signUp } = require("../controllers/auth");

//signup
router.post("/signUp", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const response = await signUp({ firstName, lastName, email, password });
   res.json(response)
  } catch (error) {
    const { status } = error;
    s = status ? status : 500;
    return res.status(s).send({
      message: error.message,
    });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await login({ email, password });

    res.json(response);
  } catch (error) {
    console.log(error);

    const { status } = error;

    s = status ? status : 500;

    return res.status(s).send({
      message: error.message,
    });
  }
});

module.exports = router;
