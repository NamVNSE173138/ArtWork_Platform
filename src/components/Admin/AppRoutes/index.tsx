import { Route, Routes } from "react-router-dom";
import Customers from "../User";
import Dashboard from "../Dashboard";
import Artwork from "../Artwork";
import Orders from "../Orders";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />}></Route>
      <Route path="/admin/artworks" element={<Artwork />}></Route>
      <Route path="/admin/orders" element={<Orders />}></Route>
      <Route path="/admin/customers" element={<Customers />}></Route>
    </Routes>
  );
}
export default AppRoutes;
