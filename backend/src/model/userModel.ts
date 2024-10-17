import mongoose, { Schema } from "mongoose";

const userschema = new Schema({
  username: Schema.Types.String,
  password: Schema.Types.String,
  email: Schema.Types.String,
  phone: Schema.Types.String,
  currency: Schema.Types.String,
  income: { type: Schema.Types.Number, default: 0 },
  balance: { type: Schema.Types.Number, default: 0 },
  refreshToken: Schema.Types.String,
});

export default mongoose.model("User", userschema);
