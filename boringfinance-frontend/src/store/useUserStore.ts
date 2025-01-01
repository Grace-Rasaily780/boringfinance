import { create } from "zustand";

export interface UserStoreState {
  user: object;
  accessToken: string | null;
  refreshToken: string | null;
  loggedIn: boolean;
  setUser: (user: object) => void;
  setLoggedIn: (status: boolean) => void;
  setBothToken: (accessToken: string, refreshToken: string) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

const useUserStore = create<UserStoreState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  loggedIn: Boolean(localStorage.getItem("loggedIn")) || false,
  setUser: (user: object) => set({ user: user }),
  setLoggedIn: (status: boolean) => set({ loggedIn: status }),
  setBothToken: (accessToken: string, refreshToken: string) =>
    set({ accessToken: accessToken, refreshToken: refreshToken }),
  setToken: (token: string) => set({ accessToken: token }),
  logout: () =>
    set({ user: {}, loggedIn: false, accessToken: "", refreshToken: "" }),
}));

export default useUserStore;
