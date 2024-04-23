const express = require("express");
const router = express.Router();

const { addOrder, getOrders } = require("../controllers/order.js");

router.post("/orders", async (req, res) => {
  try {
    const { user } = req;
    const {
      firstName,
      lastName,
      email,
      address,
      city,
      postcode,
      total,
      products,
      paymentMethod,
      shippingAddress,
      notes,
    } = req.body;
    const result = await addOrder({
      firstName,
      lastName,
      email,
      address,
      total,
      city,
      products,
      shippingAddress,
      postcode,
      paymentMethod,
      notes,
      user,
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    const { status } = error;
    s = status ? status : 500;
    return res.status(s).send({
      message: error.message,
    });
  }
});
router.get("/orders", async (req, res) => {
  try {
    const { user } = req;
    const { limit, page } = req.query;
    const result = await getOrders({ limit, page, user });
    res.json(result);
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
