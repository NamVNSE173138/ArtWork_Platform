import { Route, Routes } from "react-router-dom";
import Customers from "../User";
import Dashboard from "../Dashboard";
import Artwork from "../Artwork";
import Request from "../Request";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />}></Route>
      <Route path="/admin/artworks" element={<Artwork />}></Route>
      <Route path="/admin/requests" element={<Request />}></Route>
      <Route path="/admin/customers" element={<Customers />}></Route>
    </Routes>
  );
}
export default AppRoutes;
