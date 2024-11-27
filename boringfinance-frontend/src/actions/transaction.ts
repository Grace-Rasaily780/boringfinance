import api from "@/actions/api";
import useStore, { localTransaction, transaction } from "@/store";
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

export async function postTransaction(transaction: localTransaction) {
  const { addTransaction } = useStore.getState();
  const { setActivityPostStatus } = useStatusStore.getState();

  addTransaction(transaction);
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

export async function deleteTransaction(transaction: transaction) {
  const { updateGroup } = useStore.getState();
  const { setActivityDeleteStatus } = useStatusStore.getState();

  try {
    setActivityDeleteStatus({
      status: "PENDING",
      message: "Transaction Deleted",
    });
    const data = await api.get(`/transaction/delete/${transaction._id}`);
    if (data.status == 200) {
      setActivityDeleteStatus({
        status: "SUCCESS",
        message: "Transaction Deleteed Successfully",
      });
      updateGroup(data.data.updatedGroup);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function postEditTransaction(transaction: transaction) {
  const { updateGroup } = useStore.getState();
  const { setActivityEditStatus } = useStatusStore.getState();
  try {
    setActivityEditStatus({ status: "PENDING", message: "Transaction Edited" });
    const data = await api.post(
      `/transaction/edit/${transaction._id}`,
      transaction,
    );
    if (data.status == 200) {
      setActivityEditStatus({
        status: "SUCCESS",
        message: "Transaction Edited Successfully",
      });
      updateGroup(data.data.updatedGroup);
    }
  } catch (e) {
    console.log(e);
  }
}
