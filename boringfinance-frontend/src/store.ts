import { create } from "zustand";

export function hasId(
  transaction: transaction | localTransaction,
): transaction is transaction {
  return "_id" in transaction;
}

export interface transaction {
  _id: string;
  amount: number;
  purpose: string;
  group: string;
  date: Date;
  user_id: string;
}

export type localTransaction = Omit<transaction, "_id">;

export interface group {
  id: string;
  label: string;
  amount: number;
  percentage: number;
  size: string;
}

export interface StoreState {
  groups: group[];
  category: object[];
  incomeAmount: number;
  currentAmount: number;
  transactions: Array<transaction | localTransaction>;
  addGroup: (group: group) => void;
  updateGroup: (group: group[]) => void;
  addIncomeAmount: (amount: number) => void;
  deductCurrentAmount: (amount: number) => void;
  addCategory: (category: object) => void;
  addTransaction: (transaction: localTransaction | transaction) => void;
  setTransactions: (
    transactions: Array<transaction | localTransaction>,
  ) => void;
  setCurrentAmount: (amount: number) => void;
  setBalance: (balance: { income: number; balance: number }) => void;
}

const useStore = create<StoreState>((set) => ({
  groups: [],
  category: [],
  incomeAmount: 0,
  currentAmount: 0,
  transactions: [],
  addGroup: (group: group) =>
    set((state) => ({ groups: [...state.groups, group] })),
  updateGroup: (groups: group[]) => set({ groups: groups }),
  addIncomeAmount: (amount: number) =>
    set((state: StoreState) => ({
      incomeAmount: state.incomeAmount + amount,
      currentAmount: state.currentAmount + amount,
    })),
  deductCurrentAmount: (amount: number) =>
    set((state: StoreState) => ({
      currentAmount: state.currentAmount - amount,
    })),
  addCategory: (category: object) =>
    set((state: StoreState) => ({ category: [...state.category, category] })),
  addTransaction: (transaction: localTransaction | transaction) =>
    set((state: StoreState) => ({
      transactions: [transaction, ...state.transactions],
    })),
  setTransactions: (transactions: Array<transaction | localTransaction>) =>
    set({ transactions: transactions }),
  setCurrentAmount: (amount: number) => set({ currentAmount: amount }),
  setBalance: (balance: { income: number; balance: number }) =>
    set({ incomeAmount: balance.income, currentAmount: balance.balance }),
}));

export default useStore;
