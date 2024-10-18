import api from "@/actions/api";
import axios, { AxiosError } from "axios";
import useUserStore from "@/store/useUserStore";

export async function login(info: object) {
  const { setUser, setLoggedIn } = useUserStore.getState();
  try {
    const { data, status } = await api.post("/auth/login", info);
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    if (status == 200) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setLoggedIn(true);
      window.location.href = "/";
    }
  } catch (e) {
    console.log(e);
  }
}

export async function register(info: object) {
  const { setUser, setLoggedIn } = useUserStore.getState();
  try {
    const { data, status } = await api.post("/auth/register", info);

    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    if (status == 200) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.accessToken);
      setLoggedIn(true);
      window.location.href = "/";
    }
  } catch (e) {
    console.log(e);
  }
}

export function logout() {
  const { logout, setLoggedIn } = useUserStore.getState();

  localStorage.removeItem("user");
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  setLoggedIn(false);
  logout();
}

export async function deleteUser(info: object) {
  const { setLoggedIn } = useUserStore.getState();
  try {
    const { status } = await api.post("/user/delete", info);

    if (status == 200) {
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setLoggedIn(false);
      window.location.href = "/login";
    }
  } catch (e) {
    console.log(e);
  }
}

export async function refreshAccessToken() {
  const { refreshToken, user, setToken } = useUserStore.getState();
  try {
    const { data } = await api.post("/auth/refresh-token", {
      user: user._id,
      refreshToken,
    });

    setToken(data.accessToken);
    localStorage.setItem("accessToken", data.accessToken);

    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const axiosError = e as AxiosError;
      if (
        axiosError.response?.data &&
        typeof axiosError.response.data === "object" &&
        "error" in axiosError.response.data
      ) {
        const errorData = axiosError.response.data as { error: string };
        if (errorData.error === "jwt expired") {
          logout();
        }
      }
    }
    console.error("Error refreshing token:", e);
  }
}

export async function updateCurrency(currency: string) {
  const { user, setUser } = useUserStore.getState();
  try {
    const { data } = await api.post(`/user/currency/${user._id}`, { currency });

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
}
