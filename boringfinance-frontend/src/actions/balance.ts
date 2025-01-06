import api from "@/actions/api";
import useStore from "@/store";
import { calibratePercentageAmount } from "@/actions/calibrate/calibrate";
import useUserStore from "@/store/useUserStore";
import useStatusStore from "@/store/useStatusStore";
import useIncomeStore, { Record } from "@/store/useIncomeStore";

export async function fetchBalance() {
  const { setBalance } = useStore.getState();
  const { user } = useUserStore.getState();
  try {
    if (user !== null) {
      const { data } = await api.get(`balance/${user?._id}`);

      setBalance(data);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function fetchIncomes() {
  const { setRecords } = useIncomeStore.getState();
  const { user } = useUserStore.getState();
  try {
    const {
      data: { records },
    } = await api.get(`balance/income/${user._id}`);

    setRecords(records);
  } catch (e) {
    console.log(e);
  }
}

export async function addIncome(income: {
  amount: number;
  user: string;
  source: string;
  date: Date;
}) {
  const { addIncomeAmount, currentAmount } = useStore.getState();
  const { setAmountStatus } = useStatusStore.getState();
  try {
    setAmountStatus({ status: "PENDING", message: "Income Posted" });
    const { status } = await api.post(`/balance/addincome`, income);

    if (status == 200) {
      setAmountStatus({
        status: "SUCCESS",
        message: "Income Successfully Posted",
      });
      addIncomeAmount(income.amount);
      calibratePercentageAmount(income.amount);
      updateCurrentAmount(currentAmount + income?.amount, income.user);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function updateCurrentAmount(amount: number, id: string) {
  try {
    await api.post(`/balance/updatebalance/${id}`, {
      balance: amount,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function updateIncomeAmount(amount: number, id: string) {
  try {
    await api.post(`/balance/updateincome/${id}`, {
      income: amount,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function editIncomeAmountApi(record: Record) {
  const { updateGroup } = useStore.getState();
  try {
    const { data } = await api.post(`/balance/income/edit`, record);
    updateGroup(data.updatedGroup);
    // console.log(data);
  } catch (e) {
    console.log(e);
  }
}

export async function deleteIncome(record: Record) {
  const { updateGroup } = useStore.getState();
  // const { setActivityDeleteStatus } = useStatusStore.getState();

  try {
    // setActivityDeleteStatus({
    //   status: "PENDING",
    //   message: "Transaction Deleted",
    // });
    const data = await api.get(`/balance/income/delete/${record._id}`);
    if (data.status == 200) {
      // setActivityDeleteStatus({
      //   status: "SUCCESS",
      //   message: "Transaction Deleteed Successfully",
      // });
      updateGroup(data.data.updatedGroup);
    }
  } catch (e) {
    console.log(e);
  }
}
