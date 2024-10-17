import api from "@/actions/api";
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
  const { refreshToken, user } = useUserStore.getState();
  try {
    const { data } = await api.post("/auth/refresh-token", {
      user: user._id,
      refreshToken,
    });
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.accessToken);

    return data;
  } catch (e) {
    if (e.response.data.error == "jwt expired") {
      logout();
    }
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
