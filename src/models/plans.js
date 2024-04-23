import { Schema, model } from 'mongoose';

const schema = new Schema({
  _id: { type: String },
  planName: { type: String },
  planPrice: { type: Number },
  productId: { type: String },
  planId: { type: String },
  planBillingPeriod: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly'
  },
  subscriptionId: { type: String }
}, { timestamps: true });

const Plan = model('plan', schema);

export default Plan;
