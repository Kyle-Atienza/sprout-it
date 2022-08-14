import { Routes, Route } from "react-router";
import { LoginUser, RegisterUser, Production } from "./pages";

export const App = () => {
  return (
    <div className='bg-accent-100'>    
    <Routes>
      <Route element={<LoginUser />} path="/" />
      <Route element={<RegisterUser />} path="/register/:token" />
      <Route element={<Production />} path="/production" />
      </Routes>
    </div>
  );
};

export default App;
