import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/page/Home";
import Login from "@/page/Login";
import Register from "@/page/Register";
import useUserStore from "@/store/useUserStore";
import Profile from "@/page/Profile";
import { Analytics } from "@vercel/analytics/react";
import IncomeHistory from "./page/IncomeHistory";

function App() {
  const loggedIn = useUserStore((state) => state.loggedIn);
  return (
    <div>
      <Analytics />
      <Routes>
        <Route
          path="/"
          element={
            loggedIn == true ? <Home /> : <Navigate replace to={"/login"} />
          }
        />
        <Route
          path="profile"
          element={
            loggedIn == true ? <Profile /> : <Navigate replace to={"/login"} />
          }
        />
        <Route
          path="income"
          element={
            loggedIn == true ? (
              <IncomeHistory />
            ) : (
              <Navigate replace to={"/login"} />
            )
          }
        />
        <Route
          path="login"
          element={
            loggedIn == false ? <Login /> : <Navigate replace to={"/"} />
          }
        />
        <Route
          path="register"
          element={
            loggedIn == false ? <Register /> : <Navigate replace to={"/"} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
