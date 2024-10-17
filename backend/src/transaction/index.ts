import { Elysia } from "elysia";
import Transaction from "../model/transactionModel";
import { verifyToken } from "../utils/index";

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

    let update = transaction.save();

    return { transaction: update, message: "Transaction Added" };
  });
