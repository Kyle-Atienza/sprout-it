import { Routes, Route, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {
  LoginUser,
  RegisterUser,
  Production,
  Records,
  Help,
  Analytics,
  Settings,
  Inventory,
  ForgotPassword,
  ResetPassword,
  Financials,
  Home,
} from "./pages";
import { useEffect } from "react";

export const App = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="bg-accent-100">
      <Routes>
        <Route element={<LoginUser />} path="/" />
        <Route element={<RegisterUser />} path="/register/:token" />
        <Route element={<Home />} path="/home" />
        <Route element={<Production />} path="/production" />
        <Route element={<Inventory />} path="/inventory" />
        <Route element={<Financials />} path="/financials" />
        <Route element={<ForgotPassword />} path="/forgot-password" />
        <Route element={<ResetPassword />} path="/reset-password/:token" />
        <Route element={<Records />} path="/records" />
        <Route element={<Help />} path="/help" />
        <Route element={<Analytics />} path="/analytics" />
        <Route element={<Settings />} path="/settings" />
      </Routes>
    </div>
  );
};

export default App;
