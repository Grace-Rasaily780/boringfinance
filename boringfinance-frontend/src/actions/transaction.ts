import api from "@/actions/api";
import useStore, { transaction } from "@/store";
import useStatusStore from "@/store/useStatusStore";

export async function fetchTransactions(id: string) {
  const { setTransactions } = useStore.getState();
  const { setActivityStatus } = useStatusStore.getState();
  try {
    setActivityStatus({ status: "PENDING", message: "API Called" });
    const { data, status } = await api.get(`/transaction/${id}`);
    if (status == 200) {
      setActivityStatus({ status: "SUCCESS", message: "Fetched Successfully" });
      setTransactions(data.reverse());
    }
  } catch (e) {
    console.log(e);
  }
}

export async function postTransaction(transaction: transaction) {
  const { setActivityPostStatus } = useStatusStore.getState();
  try {
    setActivityPostStatus({ status: "PENDING", message: "Transaction Posted" });
    const { status } = await api.post(`/transaction/add`, transaction);
    if (status == 200) {
      setActivityPostStatus({
        status: "SUCCESS",
        message: "Transaction Posted Successfully",
      });
    }
  } catch (e) {
    console.log(e);
  }
}
