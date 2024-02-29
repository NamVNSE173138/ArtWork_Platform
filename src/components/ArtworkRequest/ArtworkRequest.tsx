import React, { useState } from "react";
import { Card, Avatar, List, Pagination, Modal, Table } from "antd";
// import "antd/dist/antd.css";
const { Meta } = Card;

// Sample data for requests
const requestData = [
  {
    id: 1,
    username: "John Doe",
    email: "razo@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "2 hours ago",
    cost: "$100",
  },
  {
    id: 2,
    email: "razo@gmail.com",
    username: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    time: "3 hours ago",
    cost: "$150",
  },
  {
    id: 3,
    email: "razo@gmail.com",
    username: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "2 hours ago",
    cost: "$100",
  },
  {
    id: 4,
    email: "razo@gmail.com",
    username: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    time: "3 hours ago",
    cost: "$150",
  },
  {
    id: 5,
    email: "razo@gmail.com",
    username: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "2 hours ago",
    cost: "$100",
  },
  {
    id: 6,
    email: "razo@gmail.com",
    username: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    time: "3 hours ago",
    cost: "$150",
  },
  {
    id: 7,
    email: "razo@gmail.com",
    username: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "2 hours ago",
    cost: "$100",
  },
  {
    id: 8,
    email: "razo@gmail.com",
    username: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    time: "3 hours ago",
    cost: "$150",
  },
  {
    id: 9,
    email: "razo@gmail.com",
    username: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "2 hours ago",
    cost: "$100",
  },
  {
    id: 10,
    email: "razo@gmail.com",
    username: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    time: "3 hours ago",
    cost: "$150",
  },
  // Add more request data as needed
];

const ArtworkRequest: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Number of items per page

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  // Calculate the index range based on current page and page size
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCardClick = (request: any) => {
    setSelectedRequest(request);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
  ];
  return (
    <div style={{ padding: "20px" }}>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }}
        dataSource={requestData.slice(startIndex, endIndex)}
        renderItem={(item) => (
          <List.Item>
            <Card
              style={{ height: "150px", cursor: "pointer" }}
              onClick={() => handleCardClick(item)}
            >
              <Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.username}
                description={item.email}
              />
              <div
                style={{
                  textAlign: "right",
                  marginTop: "-20%",
                  marginRight: "20px",
                  fontSize: "15px",
                }}
              >
                <i>Price: {item.cost}</i>
              </div>
            </Card>
          </List.Item>
        )}
      />
      <Pagination
        style={{ marginTop: "20px", textAlign: "center" }}
        current={currentPage}
        pageSize={pageSize}
        total={requestData.length}
        onChange={onPageChange}
      />

      <Modal
        title="Request Details"
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {selectedRequest && (
          <Table
            dataSource={[selectedRequest]}
            columns={columns}
            pagination={false}
            // rowKey="id"
          />
        )}
      </Modal>
    </div>
  );
};

export default ArtworkRequest;
