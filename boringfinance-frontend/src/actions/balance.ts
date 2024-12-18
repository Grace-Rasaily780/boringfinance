import api from "@/actions/api";
import useStore from "@/store";
import { calibratePercentageAmount } from "@/actions/calibrate";
import useUserStore from "@/store/useUserStore";
import useStatusStore from "@/store/useStatusStore";

export async function fetchBalance() {
  const { setBalance } = useStore.getState();
  const { user } = useUserStore.getState();
  try {
    const { data } = await api.get(`balance/${user._id}`);

    setBalance(data);
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
    await api.post(`/balance/update/${id}`, {
      balance: amount,
    });
  } catch (e) {
    console.log(e);
  }
}
