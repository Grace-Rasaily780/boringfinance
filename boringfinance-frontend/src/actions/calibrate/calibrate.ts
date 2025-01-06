import useStore from "@/store";
import { updateGroupApi } from "@/actions/group";
import useUserStore from "@/store/useUserStore";
import { group, transaction, localTransaction } from "@/store";

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

export function deductPercentageAmount(localTransaction: localTransaction) {
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

export function addPercentageAmount(localTransaction: transaction) {
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

export function updatePercentageAmount(
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
