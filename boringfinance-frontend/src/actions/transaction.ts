import api from "@/actions/api";
import useStore, { transaction } from "@/store";

export async function fetchTransactions(id: string) {
  const { setTransactions } = useStore.getState();
  try {
    const { data } = await api.get(`/transaction/${id}`);
    setTransactions(data.reverse());
  } catch (e) {
    console.log(e);
  }
}

export async function postTransaction(transaction: transaction) {
  try {
    await api.post(`/transaction/add`, transaction);
  } catch (e) {
    console.log(e);
  }
}
