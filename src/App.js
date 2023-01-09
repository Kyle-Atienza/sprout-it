import { Routes, Route } from "react-router";
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
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";

export const App = () => {
  const { isLoading: batchLoading } = useSelector((state) => state.batch);
  const { isLoading: inventoryLoading } = useSelector(
    (state) => state.inventory
  );
  const { isLoading: taskLoading } = useSelector((state) => state.task);
  const { isLoading: harvestLoading } = useSelector((state) => state.harvest);
  const { isLoading: supplierLoading } = useSelector((state) => state.supplier);
  const { isLoading: userLoading } = useSelector((state) => state.user);
  const { isLoading: purchaseLoading } = useSelector(
    (state) => state.financial
  );

  const loading = [
    batchLoading,
    inventoryLoading,
    taskLoading,
    harvestLoading,
    supplierLoading,
    userLoading,
    purchaseLoading,
  ];

  return (
    <div className="bg-accent-100">
      {/* {loading.some((slice) => slice === true) ? (
        <div className="loading fixed top-0 left-0 bg-dark-400 bg-opacity-30 w-full h-full z-50 flex justify-center items-center">
          <ReactLoading
            type={"balls"}
            color={"#fff"}
            height={667}
            width={375}
          />
        </div>
      ) : null} */}
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
