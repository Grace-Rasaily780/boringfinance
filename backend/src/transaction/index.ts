import { Elysia } from "elysia";
import Transaction from "../model/transactionModel";
import { syncMethod503020, verifyToken } from "../utils/index";

export const transaction = new Elysia()
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
    await syncMethod503020(id);
    const transactions = await Transaction.find({ user: id });

    return transactions;
  })
  .post("/add", async ({ body }: { body: any }) => {
    let transaction = new Transaction({
      amount: body.amount,
      purpose: body.purpose,
      group: body.group,
      category: body.category,
      date: Date(),
      user: body.user_id,
    });

    let update = await transaction.save();
    let method = await syncMethod503020(body.user_id);

    return { transaction: update, group: method, message: "Transaction Added" };
  })
  .post(
    "/edit/:id",
    async ({ params: { id }, body }: { params: { id: string }; body: any }) => {
      const oldTransaction = await Transaction.findById(id);
      const editedTransaction = await Transaction.findOneAndUpdate(
        { _id: id },
        { $set: { ...oldTransaction?._doc!, ...body } },
        { new: true },
      );
      const updatedGroup = await syncMethod503020(oldTransaction?.user);
      return { editedTransaction, updatedGroup };
    },
  )
  .get(
    "/delete/:id",
    async ({ params: { id } }: { params: { id: string } }) => {
      const deletedTransaction = await Transaction.findOneAndDelete({
        _id: id,
      });
      const updatedGroup = await syncMethod503020(deletedTransaction?.user);
      return { deletedTransaction, updatedGroup };
    },
  );
