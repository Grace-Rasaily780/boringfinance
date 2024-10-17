import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const method503020schema = new Schema({
  group: {
    type: Schema.Types.Array,
    default: [
      {
        id: uuidv4(),
        label: "NEEDS",
        percentage: 50,
        amount: 0,
        size: "MAX",
      },
      {
        id: uuidv4(),
        label: "WANTS",
        percentage: 30,
        amount: 0,
        size: "MIN",
      },
      {
        id: uuidv4(),
        label: "SAVING",
        percentage: 20,
        amount: 0,
        size: "MIN",
      },
    ],
  },
  category: Schema.Types.Array,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Method503020", method503020schema);
