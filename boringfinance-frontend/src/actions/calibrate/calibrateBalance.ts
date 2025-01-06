import useIncomeStore, { Record } from "@/store/useIncomeStore";
import {
  deleteIncome,
  editIncomeAmountApi,
  updateCurrentAmount,
  updateIncomeAmount,
} from "../balance";
import useUserStore from "@/store/useUserStore";
import useStore from "@/store";

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

export function calibrateIncomeAmount(
  localRecord: number,
  previousRecord: number,
) {
  const { setIncomeAmount, incomeAmount } = useStore.getState();
  const { user } = useUserStore.getState();
  setIncomeAmount(incomeAmount + (previousRecord - localRecord));
  updateIncomeAmount(incomeAmount + (previousRecord - localRecord), user?._id);
}

export function updateEditIncome(localRecord: Record) {
  const { records, setRecords } = useIncomeStore.getState();

  const updatedRecords: Record[] = records.map((record: Record) => {
    if (record?._id === localRecord?._id) {
      return localRecord;
    } else {
      return record;
    }
  });
  setRecords(updatedRecords);
}

export function updateDeleteIncome(localRecord: Record) {
  const { records, setRecords } = useIncomeStore.getState();

  const updatedRecords: Record[] = records.filter((record: Record) => {
    return record._id !== localRecord._id;
  });

  setRecords(updatedRecords);
}

export function calibrateEditIncome(
  localRecord: Record,
  previousRecord: Record,
) {
  updateEditIncome(localRecord);
  calibrateIncomeAmount(previousRecord.amount, localRecord.amount);
  calibrateCurrentAmount(previousRecord.amount, localRecord.amount);
  editIncomeAmountApi(localRecord);
}

export function calibrateDeleteIncome(record: Record) {
  // addPercentageAmount(transaction);
  updateDeleteIncome(record);
  calibrateIncomeAmount(0, -record.amount);
  calibrateCurrentAmount(0, -record.amount);
  deleteIncome(record);
}
