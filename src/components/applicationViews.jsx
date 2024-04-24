import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized.jsx";
import { useEffect, useState } from "react";
import { Login } from "../pages/login.jsx";
import Home from "../pages/home.jsx";


export const ApplicationViews = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      setUser(token);
    }
  }, []);

  return (
    <Routes>
      <Route path="/login/" element={<Login />} />
      <Route element={<Authorized user={user}/>}>
        <Route path="/"></Route>
        <Route path="/home" element={<Home />}></Route>
      </Route>
    </Routes>
  );
};