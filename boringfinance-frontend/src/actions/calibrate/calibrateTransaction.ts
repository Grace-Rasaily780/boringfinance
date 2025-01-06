import useStore, { localTransaction, transaction, hasId } from "@/store";
import {
  addPercentageAmount,
  deductPercentageAmount,
  updatePercentageAmount,
} from "./calibrate";
import {
  deleteTransaction,
  postEditTransaction,
  postTransaction,
} from "../transaction";
import { updateCurrentAmount } from "../balance";
import { calibrateCurrentAmount } from "./calibrateBalance";

function isFullTransaction(
  trans: transaction | localTransaction,
): trans is transaction {
  return "_id" in trans;
}

export function updateEditTransaction(localTransaction: transaction) {
  const { transactions, setTransactions } = useStore.getState();

  const updatedTransactions: transaction[] = transactions.map(
    (transaction: transaction | localTransaction) => {
      if (hasId(transaction) && hasId(localTransaction)) {
        if (transaction?._id === localTransaction?._id) {
          return localTransaction;
        } else {
          return transaction;
        }
      }
    },
  ) as transaction[];
  setTransactions(updatedTransactions);
}

export function updateDeleteTransaction(localTransaction: transaction) {
  const { transactions, setTransactions } = useStore.getState();

  const updatedTransactions: transaction[] = transactions.filter(
    (transaction: transaction | localTransaction) => {
      if (hasId(transaction) && hasId(localTransaction)) {
        return transaction._id !== localTransaction._id;
      }
    },
  ) as transaction[];

  setTransactions(updatedTransactions);
}

export function calibrateTransaction(localTransaction: localTransaction) {
  const { deductCurrentAmount, currentAmount } = useStore.getState();
  postTransaction(localTransaction);
  deductPercentageAmount(localTransaction);
  updateCurrentAmount(
    currentAmount - localTransaction?.amount,
    localTransaction.user_id,
  );
  deductCurrentAmount(localTransaction?.amount);
}

export function calibrateEditTransaction(
  localTransaction: transaction | localTransaction,
  previousTransaction: transaction | localTransaction,
) {
  if (!isFullTransaction(localTransaction)) {
    console.warn("Attempting to delete a transaction without an ID");
    return;
  }
  if (!isFullTransaction(previousTransaction)) {
    console.warn("Attempting to delete a transaction without an ID");
    return;
  }
  updatePercentageAmount(localTransaction, previousTransaction);
  updateEditTransaction(localTransaction);
  calibrateCurrentAmount(localTransaction.amount, previousTransaction.amount);
  postEditTransaction(localTransaction);
}

export function calibrateDeleteTransaction(
  transaction: transaction | localTransaction,
) {
  if (!isFullTransaction(transaction)) {
    console.warn("Attempting to delete a transaction without an ID");
    return;
  }
  addPercentageAmount(transaction);
  updateDeleteTransaction(transaction);
  calibrateCurrentAmount(-transaction.amount, 0);
  deleteTransaction(transaction);
}
