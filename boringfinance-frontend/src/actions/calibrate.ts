import useStore, { hasId } from "@/store";
import { updateCurrentAmount } from "@/actions/balance";
import {
  deleteTransaction,
  postEditTransaction,
  postTransaction,
} from "@/actions/transaction";
import { updateGroupApi } from "@/actions/group";
import useUserStore from "@/store/useUserStore";
import { group, transaction, localTransaction } from "@/store";

function isFullTransaction(
  trans: transaction | localTransaction,
): trans is transaction {
  return "_id" in trans;
}

export function calibrateChangePercentageAmount(localSettings: group[]) {
  const { incomeAmount, groups, updateGroup } = useStore.getState();
  const { user } = useUserStore.getState();

  const update = localSettings.map((setting: group, index: number) => {
    if (groups[index].percentage - localSettings[index].percentage > 0) {
      const diffPercentage =
        groups[index].percentage - localSettings[index].percentage;
      const diffAmount = incomeAmount * (diffPercentage / 100);
      return {
        ...setting,
        amount: groups[index].amount - diffAmount,
      };
    } else if (groups[index].percentage - localSettings[index].percentage < 0) {
      const diffPercentage =
        groups[index].percentage - localSettings[index].percentage;
      const diffAmount = incomeAmount * ((diffPercentage * -1) / 100);
      return {
        ...setting,
        amount: groups[index].amount + diffAmount,
      };
    } else {
      return {
        ...setting,
        amount: groups[index].amount,
      };
    }
  });

  updateGroup(update);
  updateGroupApi(user._id, update);
}

export function calibratePercentageAmount(incomeAmount: number) {
  const { groups, updateGroup } = useStore.getState();
  const { user } = useUserStore.getState();

  const updatedGroups = groups.map((group: group) => {
    return {
      ...group,
      amount: group.amount + incomeAmount * (group.percentage / 100),
    };
  });
  updateGroup(updatedGroups);
  updateGroupApi(user._id, updatedGroups);
}

function deductPercentageAmount(localTransaction: localTransaction) {
  const { updateGroup, groups } = useStore.getState();

  const updatedGroups = groups.map((group: group) => {
    if (group.label === localTransaction.group) {
      return {
        ...group,
        amount: (localTransaction.amount - group.amount) * -1,
      };
    }
    return group;
  });

  updateGroup(updatedGroups);
}

function addPercentageAmount(localTransaction: transaction) {
  const { updateGroup, groups } = useStore.getState();

  const updatedGroups = groups.map((group: group) => {
    if (group.label === localTransaction.group) {
      return {
        ...group,
        amount: localTransaction.amount + group.amount,
      };
    }
    return group;
  });

  updateGroup(updatedGroups);
}

function updatePercentageAmount(
  localTransaction: transaction,
  previousTransaction: transaction,
) {
  const { updateGroup, groups } = useStore.getState();
  const updatedGroups = groups.map((group: group) => {
    if (group.label === localTransaction.group) {
      return {
        ...group,
        amount:
          group.amount + (previousTransaction.amount - localTransaction.amount),
      };
    }
    return group;
  });

  updateGroup(updatedGroups);
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

export function calibrateCurrentAmount(
  localTransaction: number,
  previousTransaction: number,
) {
  const { setCurrentAmount, currentAmount } = useStore.getState();
  const { user } = useUserStore.getState();
  setCurrentAmount(currentAmount + (previousTransaction - localTransaction));
  updateCurrentAmount(
    currentAmount + (previousTransaction - localTransaction),
    user?._id,
  );
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
