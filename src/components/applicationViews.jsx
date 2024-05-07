import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized.jsx";
import { useEffect, useState } from "react";
import { Login } from "../pages/login.jsx";
import Home from "../pages/home.jsx";
import Hunt from "../pages/hunt.jsx";
import Profile from "../pages/profile.jsx";
import CreateMission from "../pages/createHunt.jsx";
import HuntDetails from "../pages/huntDetails.jsx";
import EditHunt from "../pages/editHunt.jsx";
import { Register } from "../pages/register.jsx";


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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Authorized user={user}/>}>
        <Route path="/home" element={<Home />} />
        <Route path="/hunt" element={<Hunt />} />
        <Route path="/huntDetails/:huntId" element={<HuntDetails />} />
        <Route path="/editHunt/:huntId" element={<EditHunt />} />
        <Route path="/create" element={<CreateMission />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};