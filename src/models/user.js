const mongoose = require("mongoose");
const hashPassword= require("../utlis/hashpassword")
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    selectedPlan: { type: Object },

    image: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    
    stripeUserId: {
      type: String,
      required: false,
    },
    subscriptionId: {
      type: String,
      required: false,
    },

    status: { type: String, Enum: ['Pending', 'Verified', 'Subscribed', 'Active'], default: 'Pending' },
    role: {
      type: String,
      enum: ["customer", "seller"],
      default: "customer",
      required:false
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    let hashedPassword = await hashPassword(this.password);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});


const user = mongoose.model("user", userSchema);
module.exports = user;
