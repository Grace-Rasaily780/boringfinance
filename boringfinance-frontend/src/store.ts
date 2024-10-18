import { create } from "zustand";

export interface transaction {
  amount: number;
  purpose: string;
  group: string;
  date: Date;
  user_id: string;
}

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
  transactions: Array<transaction>;
  addGroup: (group: group) => void;
  updateGroup: (group: group[]) => void;
  addIncomeAmount: (amount: number) => void;
  deductCurrentAmount: (amount: number) => void;
  addCategory: (category: object) => void;
  addTransaction: (transaction: transaction) => void;
  setTransactions: (transactions: transaction[]) => void;
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
  addTransaction: (transaction: transaction) =>
    set((state: StoreState) => ({
      transactions: [transaction, ...state.transactions],
    })),
  setTransactions: (transactions: transaction[]) =>
    set({ transactions: transactions }),
  setBalance: (balance: { income: number; balance: number }) =>
    set({ incomeAmount: balance.income, currentAmount: balance.balance }),
}));

export default useStore;
