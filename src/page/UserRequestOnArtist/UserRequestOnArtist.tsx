import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios, { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Image, Typography, Button, message, Tabs, Badge } from "antd";
import type { TabsProps } from "antd";
import OrderedRequest from "./OrderedRequest";
import ApprovalsSent from "./ApprovalsSent";
import PurchasedOrders from "./PurchasedOrders";

interface User {
  _id: string;
  email: string;
  nickname: string;
  bio: string;
  role: string;
  numOfFollower: number;
  avatar: string;
  password: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormValues {
  name: string;
  description: string;
  priceEst: number;
  message: string;
}

export default function UserRequestOnArtist() {
  const navigate = useNavigate();
  const { Text, Title } = Typography;
  const [messageApi, contextHolder] = message.useMessage();
  const [tabActiveKey, setTabActiveKey] = useState("1");
  const [orderedRequestList, setOrderedRequestList] = useState([]);
  const [approvalSentList, setApprovalSentList] = useState([]);
  const [purchasedOrderList, setPurchasedOrderList] = useState([]);

  const userToken = localStorage.getItem("USER");

  const fetchOrderedRequest = async () => {
    await axios
      .get(`http://localhost:5000/users/getUserInfo`, {
        headers: {
          token: userToken, //userToken = localStorage("USER")
        },
      })
      .then((res) => {
        console.log("Current user data: ", res.data);
        axios
          .get(`http://localhost:5000/userRequests/artist/${res.data.id}`)
          .then((res) => {
            console.log("User request list: ", res.data);
            setOrderedRequestList(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const fetchApprovalSent = async () => {
    await axios
      .get(`http://localhost:5000/users/getUserInfo`, {
        headers: {
          token: userToken, //userToken = localStorage("USER")
        },
      })
      .then((res) => {
        console.log("Current user data: ", res.data);
        axios
          .get(`http://localhost:5000/artistRequests/artist/${res.data.id}`)
          .then((res) => {
            console.log("User request list: ", res.data);
            setApprovalSentList(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const fetchPurchasedOrderList = async () => {
    await axios
      .get(`http://localhost:5000/users/getUserInfo`, {
        headers: {
          token: userToken, //userToken = localStorage("USER")
        },
      })
      .then((res) => {
        console.log("Current user data: ", res.data);
        axios
          .get(
            `http://localhost:5000/artistRequests/artist/purchased/${res.data.id}`
          )
          .then((res) => {
            setPurchasedOrderList(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrderedRequest();
    fetchApprovalSent();
    fetchPurchasedOrderList();
  }, [tabActiveKey]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <Text>
          Ordered requests <strong>({orderedRequestList.length})</strong>
        </Text>
      ),
      children: <OrderedRequest />,
    },
    {
      key: "2",
      label: "Approvals sent",
      children: <ApprovalsSent />,
    },
    {
      key: "3",
      label: (
        <Badge dot={purchasedOrderList.length > 0}>
          <Text>Purchased orders</Text>
        </Badge>
      ),
      children: <PurchasedOrders />,
    },
  ];

  return (
    <>
      <Navbar onSubmit={() => {}} />
      {contextHolder}
      <Flex vertical justify="center" align="center">
        <Title
          style={{ fontFamily: '"Kanit", sans-serif', paddingBottom: "1%" }}
        >
          PERSONAL ARTWORK VISUALIZING REQUEST
        </Title>
        <Tabs
          activeKey={tabActiveKey}
          onTabClick={(key, e) => {
            e.preventDefault();
            setTabActiveKey(key);
          }}
          centered
          items={items}
          style={{ margin: "0 auto", width: "95%" }}
        />
      </Flex>
    </>
  );
}
