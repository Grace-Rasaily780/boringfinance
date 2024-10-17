import api from "@/actions/api";
import useStore from "@/store";
import { calibratePercentageAmount } from "@/actions/calibrate";
import useUserStore from "@/store/useUserStore";

export async function fetchBalance() {
  const { setBalance } = useStore.getState();
  const { user } = useUserStore.getState();
  try {
    const { data } = await api.get(`balance/${user._id}`);

    setBalance(data);
  } catch {}
}

export async function addIncome(income: object) {
  const { addIncomeAmount, currentAmount } = useStore.getState();
  try {
    await api.post(`/balance/addincome`, income);

    addIncomeAmount(income.amount);
    calibratePercentageAmount(income.amount);
    updateCurrentAmount(currentAmount + income?.amount, income.user);
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
