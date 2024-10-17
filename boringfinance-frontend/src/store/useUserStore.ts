import { create } from "zustand";

const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || {},
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  loggedIn: Boolean(localStorage.getItem("loggedIn")) || false,
  setUser: (user: object) => set({ user: user }),
  setLoggedIn: (status: boolean) => set({ loggedIn: status }),
  setAuthToken: (token: string) => set({ authToken: token }),
  logout: () =>
    set({ user: {}, loggedIn: false, accessToken: "", refreshToken: "" }),
}));

export default useUserStore;
