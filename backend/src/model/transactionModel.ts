import mongoose, { Schema } from "mongoose";

const transactionschema = new Schema({
  amount: Schema.Types.Number,
  purpose: Schema.Types.String,
  group: Schema.Types.String,
  category: Schema.Types.String,
  date: Schema.Types.Date,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Transaction", transactionschema);
