import { Routes, Route } from "react-router";
import { LoginUser, RegisterUser, Production, Records } from "./pages";

export const App = () => {
  return (
    <div className="bg-accent-100">
      <Routes>
        <Route element={<LoginUser />} path="/" />
        <Route element={<RegisterUser />} path="/register/:token" />
        <Route element={<Production />} path="/production" />
        <Route element={<Records />} path="/records" />
      </Routes>
    </div>
  );
};

export default App;
