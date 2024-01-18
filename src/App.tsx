import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import LoginForm from "./page/Login";
import SignupForm from "./page/Signup";
import Upload from "./page/Upload";
import Profile from "./page/Profile";
import Admin from "./page/Admin/Admin";
import Customers from "./components/Admin/Customers";
import Dashboard from "./components/Admin/Dashboard";
import Inventory from "./components/Admin/Inventory";
import Orders from "./components/Admin/Orders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
      {/* <Route path="/admin/dashboard" element={<Dashboard />}></Route>
      <Route path="/admin/artworks" element={<Inventory />}></Route>
      <Route path="/admin/orders" element={<Orders />}></Route>
      <Route path="/admin/customers" element={<Customers />}></Route> */}
    </Routes>
  );
}

export default App;
