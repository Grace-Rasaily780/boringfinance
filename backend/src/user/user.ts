import { Elysia } from "elysia";
import bcrypt from "bcryptjs";
import User from "../model/userModel";
import {
  verifyToken,
  deleteMethod503020,
  deleteTransaction,
  deleteBalance,
} from "../utils";
import Transaction from "../model/transactionModel";
import Balance from "../model/balanceRecordModel";

interface apiBody {
  _id: string;
  username: string;
  email: string;
  password: string;
  currency: string;
  balance: number;
  refreshToken: string;
}

export const user = new Elysia()
  .onBeforeHandle(({ headers, set }) => {
    if (!headers.authorization) {
      set.status = 400;
      set.headers["WWW-Authenticate"] = `realm='sign', error="invalid_request"`;

      return "Unauthorized";
    } else {
      verifyToken(headers.authorization);
    }
  })
  .get("/:id", async ({ params: { id } }) => {
    let model = await User.findById(id);

    let settings = {
      _id: model?.id,
      username: model?.username,
      email: model?.email,
      phone: model?.phone,
      currency: model?.currency,
      balance: model?.balance,
    };
    return settings;
  })
  .post(
    "/currency/:id",
    async ({
      params: { id },
      body,
    }: {
      params: { id: string };
      body: apiBody;
    }) => {
      let user: apiBody = await User.findByIdAndUpdate(
        id,
        { $set: { currency: body.currency } },
        { new: true },
      );
      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        currency: user.currency,
      };
    },
  )
  .put(
    "/balance/:id",
    async ({
      params: { id },
      body,
    }: {
      params: { id: string };
      body: apiBody;
    }) => {
      let user = await User.findByIdAndUpdate(
        id,
        { $set: { balance: body.balance } },
        { new: true },
      );
      return { message: "Balance Updated" };
    },
  )
  .post("/delete", async ({ set, body }: { set: any; body: apiBody }) => {
    let user: apiBody = await User.findOne({ email: body.email });

    if (!user) {
      set.status = 401;
      return "Invalid email or password";
    }

    const valid = bcrypt.compare(user.password, body.password);
    if (!valid) {
      set.status = 401;
      return "Invalid email or password";
    }

    await User.findByIdAndDelete(user._id);
    await deleteMethod503020(user._id);
    const transactions = await Transaction.find({ user: user._id });
    const records = await Balance.find({ user: user._id });
    deleteTransaction(transactions);
    deleteBalance(records);

    return { message: "User Deleted" };
  });
