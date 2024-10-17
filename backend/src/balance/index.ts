import { Elysia } from "elysia";
import Balance from "../model/balanceRecordModel";
import User from "../model/userModel";
import { updateBalance, addIncome, verifyToken } from "../utils";

export const balance = new Elysia()
  .onBeforeHandle(({ headers, set }) => {
    if (!headers.authorization) {
      set.status = 400;
      set.headers["WWW-Authenticate"] = `realm='sign', error="invalid_request"`;

      return "Unauthorized";
    } else {
      verifyToken(headers.authorization);
    }
  })
  .get("/:id", async ({ params: { id } }: { params: { id: string } }) => {
    let user = await User.findById(id);
    return { income: user?.income, balance: user?.balance };
  })
  .post("/addincome", async ({ body }: { body: any }) => {
    let newBalance = new Balance({
      amount: body.amount,
      source: body.source,
      date: Date(),
      user: body.user,
    });
    await newBalance.save();
    addIncome(body.user, body.amount);
    return { message: "Balance Record Added" };
  })
  .post(
    "/update/:id",
    async ({ params: { id }, body }: { params: { id: string }; body: any }) => {
      await User.findByIdAndUpdate(
        id,
        { $set: { balance: body.balance } },
        { upsert: true },
      );
      return { message: "Balance Updated" };
    },
  );
