import { create } from "zustand";

export interface Record {
  _id: string;
  amount: number;
  source: string;
  date: string | Date;
  user: string;
}

export interface UserIncomeState {
  records: Record[];
  setRecords: (records: Record[]) => void;
}

const useIncomeStore = create<UserIncomeState>((set) => ({
  records: [],
  setRecords: (records: Record[]) => set({ records: records }),
}));

export default useIncomeStore;
