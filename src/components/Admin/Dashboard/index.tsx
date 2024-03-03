import {
  PictureOutlined,
  SolutionOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getArtwork, getRevenue, getUser } from "../../../api/index";
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
import { getReportWithUserAndArtwork } from "../../../api/report/reportAPI";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard(): JSX.Element {
  const [requests, setRequests] = useState<number>(0);
  const [artworks, setArtworks] = useState<number>(0);
  const [users, setUsers] = useState<number>(0);
  const [reports, setReports] = useState<number>(0);

  useEffect(() => {
    getArtwork().then((res: any) => {
      setRequests(res.filter((count: any) => count.status === false).length);
    });
    getArtwork().then((res: any) => {
      setArtworks(res.length);
    });
    getUser().then((res: any) => {
      setUsers(res.length);
    });
    getReportWithUserAndArtwork().then((res: any) => {
      setReports(res.length);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <SolutionOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Requests"}
          value={requests}
        />
        <DashboardCard
          icon={
            <PictureOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Artworks"}
          value={artworks}
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
          title={"Users"}
          value={users}
        />
        <DashboardCard
          icon={
            <WarningOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Reports"}
          value={reports}
        />
      </Space>
      <Space>
        <RecentRequest />
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

function RecentRequest(): JSX.Element {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getArtwork().then((res: any) => {
      setDataSource(res.splice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recent Requests</Typography.Text>
      <Table
        style={{ width: "630px" }}
        columns={[
          {
            title: "Name",
            dataIndex: "nickname",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Untitled",
            dataIndex: "",
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
