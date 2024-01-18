import { Route, Routes } from "react-router-dom";
import Customers from "../Customers";
import Dashboard from "../Dashboard";
import Inventory from "../Inventory";
import Orders from "../Orders";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />}></Route>
      <Route path="/admin/artworks" element={<Inventory />}></Route>
      <Route path="/admin/orders" element={<Orders />}></Route>
      <Route path="/admin/customers" element={<Customers />}></Route>
    </Routes>
  );
}
export default AppRoutes;
