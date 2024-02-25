import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Upload from "./page/Upload";
import Profile from "./page/Profile";
import Admin from "./page/Admin/Admin";
import SignIn from "./page/Authentication/SignIn";
import EmailSignup from "./page/Authentication/EmailSignup";
import SignUp from "./page/Authentication/SignUp";
import Forgot from "./page/Authentication/Forgot";
import Reset from "./page/Authentication/Reset";
import Navigator from "./page/Navigator/Navigator";
import FavoriteList from "./page/FavoriteList/FavoriteList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup/email" element={<EmailSignup />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset/:id" element={<Reset />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/navigator" element={<Navigator />} />
      <Route path="/favoriteList" element={<FavoriteList />} />
    </Routes>
  );
}

export default App;
