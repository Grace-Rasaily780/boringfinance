import useStore from "@/store";
import { updateCurrentAmount } from "@/actions/balance";
import { postTransaction } from "@/actions/transaction";
import { updateGroupApi } from "@/actions/group";
import useUserStore from "@/store/useUserStore";

export function calibrateChangePercentageAmount(localSettings: any) {
  const { incomeAmount, groups, updateGroup } = useStore.getState();
  const { user } = useUserStore.getState();

  const update = localSettings.map((setting, index) => {
    if (groups[index].percentage - localSettings[index].percentage > 0) {
      let diffPercentage =
        groups[index].percentage - localSettings[index].percentage;
      let diffAmount = incomeAmount * (diffPercentage / 100);
      return {
        ...setting,
        amount: groups[index].amount - diffAmount,
      };
    } else if (groups[index].percentage - localSettings[index].percentage < 0) {
      let diffPercentage =
        groups[index].percentage - localSettings[index].percentage;
      let diffAmount = incomeAmount * ((diffPercentage * -1) / 100);
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

  const updatedGroups = groups.map((group) => {
    return {
      ...group,
      amount: group.amount + incomeAmount * (group.percentage / 100),
    };
  });
  updateGroup(updatedGroups);
  updateGroupApi(user._id, updatedGroups);
}

function deductPercentageAmount(localTransaction: object) {
  const { updateGroup, groups } = useStore.getState();
  const { user } = useUserStore.getState();

  const updatedGroups = groups.map((group) => {
    if (group.label === localTransaction.group) {
      return {
        ...group,
        amount: (localTransaction.amount - group.amount) * -1,
      };
    }
    return group;
  });

  updateGroup(updatedGroups);
  updateGroupApi(user._id, updatedGroups);
}

export function calibrateTransaction(localTransaction: object) {
  const { currentAmount, deductCurrentAmount, addTransaction } =
    useStore.getState();

  addTransaction(localTransaction);
  deductCurrentAmount(localTransaction?.amount);
  postTransaction(localTransaction);
  deductPercentageAmount(localTransaction);
  updateCurrentAmount(
    currentAmount - localTransaction?.amount,
    localTransaction.user_id,
  );
}
