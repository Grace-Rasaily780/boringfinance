import mongoose, { Schema } from "mongoose";

const balanceRecordschema = new Schema({
  amount: Schema.Types.Number,
  source: Schema.Types.String,
  date: Schema.Types.Date,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Balance Records", balanceRecordschema);
