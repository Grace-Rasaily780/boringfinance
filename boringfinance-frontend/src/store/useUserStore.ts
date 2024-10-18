import { create } from "zustand";

// export interface UserState {

// }

export interface UserStoreState {
  user: any;
  accessToken: string | null;
  refreshToken: string | null;
  loggedIn: boolean;
  setUser: (user: any) => void;
  setLoggedIn: (status: boolean) => void;
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
  setToken: (token: string) => set({ accessToken: token }),
  logout: () =>
    set({ user: {}, loggedIn: false, accessToken: "", refreshToken: "" }),
}));

export default useUserStore;
