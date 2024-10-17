import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

const useStore = create((set) => ({
  groups: [],
  category: [],
  incomeAmount: 0,
  currentAmount: 0,
  transactions: [],
  addGroup: (group: object) =>
    set((state: object) => ({ groups: [...state.groups, group] })),
  updateGroup: (groups: Array<object>) => set({ groups: groups }),
  addIncomeAmount: (amount: number) =>
    set((state: object) => ({
      incomeAmount: state.incomeAmount + amount,
      currentAmount: state.currentAmount + amount,
    })),
  deductCurrentAmount: (amount: number) =>
    set((state: object) => ({ currentAmount: state.currentAmount - amount })),
  addCategory: (category: object) =>
    set((state: object) => ({ category: [...state.category, category] })),
  addTransaction: (transaction: object) =>
    set((state: object) => ({
      transactions: [transaction, ...state.transactions],
    })),
  setTransactions: (transactions: Array<object>) =>
    set({ transactions: transactions }),
  setBalance: (balance: object) =>
    set({ incomeAmount: balance.income, currentAmount: balance.balance }),
}));

export default useStore;
