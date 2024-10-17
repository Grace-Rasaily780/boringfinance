import api from "@/actions/api";
import useStore from "@/store";
import { calibrateTransaction } from "@/actions/calibrate";

export async function fetchTransactions(id: string) {
  const { setTransactions } = useStore.getState();
  try {
    const { data } = await api.get(`/transaction/${id}`);
    setTransactions(data.reverse());
  } catch {}
}

export async function postTransaction(transaction: object) {
  try {
    const { data } = await api.post(`/transaction/add`, transaction);
  } catch (e) {
    console.log(e);
  }
}
