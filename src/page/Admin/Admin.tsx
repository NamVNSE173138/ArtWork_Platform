import React, { useState, useEffect } from "react";
import "./Admin.css";
import {
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SolutionOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar, theme, Breadcrumb } from "antd";
import User from "../../components/Admin/User";
import Dashboard from "../../components/Admin/Dashboard";
import Artwork from "../../components/Admin/Artwork";
import Request from "../../components/Admin/Request/index";
import avt from "../../assets/image/e1eb03f8282b4f89a438983023e90697 (1).png";

const { Header, Sider, Content } = Layout;

const Admin: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>(
    localStorage.getItem("activeComponent") || "Dashboard"
  );

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
      label: "User",
      onClick: () => setActiveComponent("User"),
    },
    {
      key: "3",
      icon: <ShopOutlined />,
      label: "Artwork",
      onClick: () => setActiveComponent("Artwork"),
    },
    {
      key: "4",
      icon: <ShoppingCartOutlined />,
      label: "Request",
      onClick: () => setActiveComponent("Request"),
    },
  ];

  useEffect(() => {
    localStorage.setItem("activeComponent", activeComponent);
  }, [activeComponent]);

  return (
    <Layout className="Admin">
      <Sider>
        <div className="AppHeader">
          <Avatar size={40} src={avt} className="logo" />
        </div>
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          defaultSelectedKeys={[activeComponent]}
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
            margin: "20px 16px",
            padding: 20,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Breadcrumb
            items={[
              {
                href: "/home",
                title: <HomeOutlined />,
              },
              {
                href: "/admin",
                title: (
                  <>
                    <UserOutlined />
                    <span>Admin</span>
                  </>
                ),
              },
              {
                href: "",
                title: activeComponent,
              },
            ]}
          />
          {activeComponent === "Dashboard" && <Dashboard />}
          {activeComponent === "User" && <User />}
          {activeComponent === "Request" && <Request />}
          {activeComponent === "Artwork" && <Artwork />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
