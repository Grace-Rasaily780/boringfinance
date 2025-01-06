import { Elysia } from "elysia";
import Balance from "../model/balanceRecordModel";
import User from "../model/userModel";
import {
  updateBalance,
  addIncome,
  verifyToken,
  syncMethod503020,
} from "../utils";

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
  .get(
    "/income/:id",
    async ({ params: { id } }: { params: { id: string } }) => {
      let records = await Balance.find({ user: id });
      return { records };
    },
  )
  .post("/income/edit", async ({ body }: { body: any }) => {
    const previousRecord = await Balance.findById(body._id);
    const editedRecord = await Balance.findOneAndUpdate(
      { _id: body._id },
      { $set: { ...previousRecord?._doc!, ...body } },
      { new: true },
    );
    const updatedGroup = await syncMethod503020(editedRecord?.user);
    return { updatedGroup, editedRecord };
  })
  .get(
    "/income/delete/:id",
    async ({ params: { id } }: { params: { id: string } }) => {
      const deletedIncome = await Balance.findOneAndDelete({
        _id: id,
      });
      const updatedGroup = await syncMethod503020(deletedIncome?.user);
      return { deletedIncome, updatedGroup };
    },
  )
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
    "/updateincome/:id",
    async ({ params: { id }, body }: { params: { id: string }; body: any }) => {
      await User.findByIdAndUpdate(
        id,
        { $set: { income: body.income } },
        { new: true },
      );

      return { message: "Income Updated" };
    },
  )
  .post(
    "/updatebalance/:id",
    async ({ params: { id }, body }: { params: { id: string }; body: any }) => {
      await User.findByIdAndUpdate(
        id,
        { $set: { balance: body.balance } },
        { upsert: true },
      );
      return { message: "Balance Updated" };
    },
  );
