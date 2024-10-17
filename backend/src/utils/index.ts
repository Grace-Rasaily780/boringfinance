import User from "../model/userModel";
import Method503020 from "../model/503020Model";
import Transaction from "../model/transactionModel";
import jwt from "jsonwebtoken";

export const addIncome = async (id: string, balance: number) => {
  let prevBalance: any = await User.findById(id);

  let newBalance = prevBalance.balance + balance;
  let newIncome = prevBalance.income + balance;

  let user = await User.findByIdAndUpdate(
    id,
    { $set: { income: newIncome, balance: newBalance } },
    { upsert: true },
  );
  return { message: "Balance Added" };
};

export const updateBalance = async (id: string, balance: number) => {
  let prevBalance: any = await User.findById(id);

  let newBalance = prevBalance.balance + balance;

  let user = await User.findByIdAndUpdate(
    id,
    { $set: { income: newBalance } },
    { new: true },
  );
  return { message: "Balance Added" };
};

export const initateMethod503020 = async (id: string) => {
  let int = new Method503020({
    user: id,
  });

  await int.save();
  return { message: "Method 503020 Initated" };
};

export const deleteMethod503020 = async (id: string) => {
  await Method503020.findOneAndDelete({
    user: id,
  });

  return { message: "Method 503020 Eemoved" };
};

export const totalPercenatageCalc = (types: Array<any>) => {
  let totalPercentage: number = 0;
  for (let i = 0; i < types.length; i++) {
    totalPercentage += types[i].percentage;
  }
  return totalPercentage;
};

export const generateTokens = (userId: string, email: string) => {
  const accessToken = jwt.sign(
    { userId, email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    },
  );
  const refreshToken = jwt.sign(
    { userId, email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );
  return { accessToken, refreshToken };
};

export const storeRefreshToken = async (id: string, refreshToken: string) => {
  await User.findByIdAndUpdate(
    id,
    { $set: { refreshToken: refreshToken } },
    { new: true },
  );
};

export const verifyToken = (token: string) => {
  let decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return decode;
};

export const deleteTransaction = (transactions: any) => {
  transactions.map(async (transaction) => {
    await Transaction.findOneAndDelete(transaction._id);
  });
};
