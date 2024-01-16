import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import LoginForm from "./page/Login";
import SignupForm from "./page/Signup";
import Upload from "./page/Upload";
import Profile from "./page/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
