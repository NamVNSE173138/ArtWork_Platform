import { Space, Layout, Menu } from "antd";
import { Route, Link, Routes } from "react-router-dom";
import "./Admin.css";
import AppFooter from "../../components/Admin/AppFooter";
import AppHeader from "../../components/Admin/AppHeader";
import PageContent from "../../components/Admin/PageContent";
import SideMenu from "../../components/Admin/SideMenu";
import Customers from "../../components/Admin/Customers";
import Dashboard from "../../components/Admin/Dashboard";
import Inventory from "../../components/Admin/Inventory";
import Orders from "../../components/Admin/Orders";

const { Sider, Content } = Layout;

function Admin() {
  return (
    // <Layout>
    //   <div className="Admin">
    //     <AppHeader />
    //     <div className="SideMenuAndPageContent">
    //       <Sider>
    //           <SideMenu />
    //       </Sider>

    //       <Content>
    //         {/* <Routes>
    //           <Route path="/admin/dashboard" element={<Dashboard />}></Route>
    //           <Route path="/admin/artworks" element={<Inventory />}></Route>
    //           <Route path="/admin/orders" element={<Orders />}></Route>
    //           <Route path="/admin/customers" element={<Customers />}></Route>
    //         </Routes> */}
    //         <PageContent></PageContent>
    //       </Content>
    //     </div>
    //     <AppFooter />
    //   </div>
    // </Layout>
    <div className="Admin">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
      <AppFooter />
    </div>
  );
}
export default Admin;
