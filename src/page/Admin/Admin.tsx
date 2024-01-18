import React, { useState } from "react";
import "./Admin.css";
import {
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Input, Avatar, theme } from "antd";
// import MyDay from "../My Day/MyDay";
import Customers from "../../components/Admin/Customers";
import Dashboard from "../../components/Admin/Dashboard";
import Inventory from "../../components/Admin/Inventory";
import Orders from "../../components/Admin/Orders";
import avt from "../../assets/image/e1eb03f8282b4f89a438983023e90697 (1).png";
const { Header, Sider, Content } = Layout;

// interface UserData {
//   avatar: string;
//   name: string;
//   email: string;
// }

const Admin: React.FC = () => {
  // const [collapsed, setCollapsed] = useState<boolean>(false);
  const [activeComponent, setActiveComponent] = useState<string>("Dashboard");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Dummy user data
  // const userData: UserData = {
  //   avatar:
  //     "https://i.pinimg.com/564x/4a/05/b1/4a05b176175fe8ace75e68262057ab25.jpg",
  //   name: "Văn Anh Quân",
  //   email: "qsao2212@gmail.com",
  // };

  //account, artwork, request, transaction, report,
  const menuItems = [
    {
      key: "1",
      icon: <SolutionOutlined />,
      label: "Dashboard",
      onClick: () => setActiveComponent("Dashboard"),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Customers",
      onClick: () => setActiveComponent("Customers"),
    },
    // {
    //   key: "3",
    //   icon: <SolutionOutlined />,
    //   label: "My Day",
    //   onClick: () => setActiveComponent("MyDay"),
    // },
    {
      key: "4",
      icon: <ShopOutlined />,
      label: "Artwork",
      onClick: () => setActiveComponent("Inventory"),
    },
    {
      key: "5",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
      onClick: () => setActiveComponent("Orders"),
    },
  ];

  return (
    <Layout className="Admin">
      <Sider>
        <div className="AppHeader">
          <Avatar size={40} src={avt} className="logo" />
          {/* {!collapsed ? (
            <>
              <span style={{ marginTop: "10px", fontWeight: "bold" }}>
                {userData.name}
              </span>
              <span>{userData.email}</span>
            </>
          ) : null} */}
        </div>
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          defaultSelectedKeys={["1"]}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginLeft: "650px" }}>Admin</h2>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {activeComponent === "Dashboard" && <Dashboard />}
          {activeComponent === "Customers" && <Customers />}
          {activeComponent === "Orders" && <Orders />}
          {activeComponent === "Inventory" && <Inventory />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
