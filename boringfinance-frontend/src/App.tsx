import { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "@/page/Home";
import Login from "@/page/Login";
import Register from "@/page/Register";
import useUserStore from "@/store/useUserStore";
import Profile from "@/page/Profile";
import { Analytics } from "@vercel/analytics/react"

function App() {
  const navigate = useNavigate();

  const loggedIn = useUserStore((state) => state.loggedIn);
  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login");
    } else if (loggedIn === true) {
      navigate("/");
    }
  }, [loggedIn]);
  return (
    <div>
      <Analytics />
      <Routes>
        {loggedIn === true ? (
          <>
            <Route path="/" Component={Home} />
            <Route path="/profile" Component={Profile} />
          </>
        ) : null}
        {loggedIn === false ? (
          <>
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
          </>
        ) : null}
      </Routes>
    </div>
  );
}

export default App;
