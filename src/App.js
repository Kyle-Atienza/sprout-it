import { Routes, Route } from "react-router";
import {
  LoginUser,
  RegisterUser,
  Production,
  Records,
  Help,
  Analytics,
} from "./pages";

export const App = () => {
  return (
    <div className="bg-accent-100">
      <Routes>
        <Route element={<LoginUser />} path="/" />
        <Route element={<RegisterUser />} path="/register/:token" />
        <Route element={<Production />} path="/production" />
        <Route element={<Records />} path="/records" />
        <Route element={<Help />} path="/help" />
        <Route element={<Analytics />} path="/analytics" />
      </Routes>
    </div>
  );
};

export default App;
