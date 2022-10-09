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
  Home
} from "./pages";

export const App = () => {
  return (
    <div className='bg-accent-100'>
      <Routes>
        <Route element={<LoginUser />} path='/' />
        <Route element={<RegisterUser />} path='/register/:token' />
        <Route element={<Home />} path='/home' />
        <Route element={<Production />} path='/production' />
        <Route element={<Inventory />} path='/inventory' />
        <Route element={<Financials />} path='/financials' />
        <Route element={<ForgotPassword />} path='/forgot-password' />
        <Route element={<ResetPassword />} path='/reset-password/:token' />
        <Route element={<Records />} path='/records' />
        <Route element={<Help />} path='/help' />
        <Route element={<Analytics />} path='/analytics' />
        <Route element={<Settings />} path='/settings' />
      </Routes>
    </div>
  );
};

export default App;
