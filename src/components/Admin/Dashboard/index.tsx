import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  getArtwork,
  getCustomers,
  getInventory,
  getOrders,
  getRevenue,
  getUser,
} from "../../../api/index";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function Dashboard(): JSX.Element {
  const [orders, setOrders] = useState<number>(0);
  const [inventory, setInventory] = useState<number>(0);
  const [users, setUsers] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  useEffect(() => {
    getOrders().then((res: any) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getArtwork().then((res: any) => {
      setInventory(res.total);
    });
    getUser().then((res: any) => {
      setUsers(res.total);
    });
  }, []);
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Orders"}
          value={orders}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Inventory"}
          value={inventory}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Customer"}
          value={users}
        />
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Revenue"}
          value={revenue}
        />
      </Space>
      <Space>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
  );
}
function DashboardCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: JSX.Element;
}): JSX.Element {
  return (
    <Card style={{ width: "310px" }}>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders(): JSX.Element {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    getOrders().then((res: any) => {
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        style={{ width: "630px" }}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "discountedPrice",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}
function DashboardChart(): JSX.Element {
  const [reveneuData, setReveneuData] = useState<any>({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    getRevenue().then((res: any) => {
      const labels = res.carts.map((cart: any) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart: any) => {
        return cart.discountedTotal;
      });
      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };
      setReveneuData(dataSource);
    });
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };
  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar data={reveneuData} />
    </Card>
  );
}
export default Dashboard;
