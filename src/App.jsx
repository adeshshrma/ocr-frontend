import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import AllOcr from "./pages/AllOcr";

function App() {
  const isAuth = useSelector((state) => state.auth.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route path="/register" element={isAuth ? <Home /> : <Register />} />
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
        <Route path="/all_records" element={isAuth ? <AllOcr /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
