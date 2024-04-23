const express = require("express");
const router = express.Router();
import User from "../models/user";

import { GetSubscriptionPlans,CreateSubscription ,CreateCustomer} from "../controllers/stripe";


router.get("/get-subscriptions", async (req, res) => {
  try {
    const response = await GetSubscriptionPlans();
    res.json(response);
  } catch (error) {
    console.log(error);
    const { status } = error;
    let s = status ? status : 500;
    return res.status(s).send({
      message: error.message,
    });
  }
});
const CreateStripeSubscription = async ({
  userId,
  userData,
  source,
  selectedPlan,
  planId,
}) => {
  try {
    const user = await User.findOne({ _id: userId });
    const { cardName } = userData;

    let stripeUserId = user?.payment?.stripeUserId;
    if (!stripeUserId) {
      const customer = await CreateCustomer({
        email: user.email,
        name: cardName,
        source,
        metaData: {
          app: 'ChatPro'
        }
      });

      stripeUserId = customer.id;

      await User.updateOne({ _id: userId }, {
        $set: {
          'payment.stripeUserId': stripeUserId
        }
      });
    }
    const subscriptionResponse = await CreateSubscription({
      priceId: planId,
      customerId: stripeUserId,
      // coupon
    });

    await User.updateOne({ _id: userId }, {
      $set: {
        'subscriptionId': subscriptionResponse.id,
        // cardName,
        selectedPlan,
        // addressTitle,
        // address
      }
    });

    // return true;
    return subscriptionResponse;
  } catch (err) {
    return err;
  }
};

router.post('/create-user-subscription',  async (req, res) => {
  try {
    const { user: { _id: userId }, body: { planId, userData, selectedPlan ,source} } = req;

    // console.log("source=",source)
    const subscriptionData = await CreateStripeSubscription({
      userId,
      selectedPlan,
      source,
      planId,
      userData
    });
    const user = await User.findOne({ _id: userId });


    const { status } = user;
    console.log({subscriptionData})
    if (subscriptionData?.id ) { res.status(200).json({ status: true, user, subscriptionData }); }
    else res.status(400).json({ error: 'Subscription Not Created, Please Try Again' });
  } catch (err) {
    console.log(err);
    const { status } = err;
    s = status ? status : 500;
    return res.status(s).send({
      message: err.message,
    });
  }
});






module.exports = router;
