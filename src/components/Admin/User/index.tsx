import {
  Avatar,
  Space,
  Table,
  Modal,
  Input,
  Switch,
  Select,
  SelectProps,
  Button,
  message,
} from "antd";
import {
  EditOutlined,
  SolutionOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getUser, deleteUser, updateUser, getUserId } from "../../../api/index";
import axios, { AxiosResponse } from "axios";
interface User {
  avatar: string;
  nickname: string;
  role: string;
  email: string;
  status: { status: string };
  _id: string;
}

interface Artwork {
  _id: string;
  user: User;
  name: string;
  tags: [string];
  numOfLike: number;
  price: number;
  description: string;
  imageUrl: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface EditFormData {
  nickname?: string;
  email?: string;
  role?: string;
  status?: boolean;
}

interface BanData {
  status?: boolean;
}

const options: SelectProps["options"] = [
  {
    value: "user",
    label: "User",
  },
  {
    value: "artist",
    label: "Artist",
  },
  {
    value: "admin",
    label: "Admin",
  },
];

function Users() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [testRecord, setTestRecord] = useState<User | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState<string>();
  const [banData, setBanData] = useState<BanData>({
    status: false,
  });
  const [editFormData, setEditFormData] = useState<EditFormData | null>({
    nickname: "",
    email: "",
    role: "",
    status: false,
  });

  useEffect(() => {
    setLoading(true);
    getUser().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }, []);

  const [messageApi, contextHolder] = message.useMessage();

  const onUpdateArtistRole = async () => {
    await axios
      .get("http://localhost:5000/artworks")
      .then((res: AxiosResponse) => {
        res.data.map((artwork: Artwork) => {
          axios
            .patch(`http://localhost:5000/users/updateRole/${artwork.user}`)
            .then((res) => {
              console.log("User role updated: ", artwork.user);
            })
            .catch((err) => console.log(err));
        });
      });
    messageApi
      .open({
        type: "loading",
        content: "Updating...",
        duration: 1,
      })
      .then(() => message.success("Successfully updated", 3));
  };

  const onDeleteUser = (record: User) => {
    console.log(record);
    Modal.confirm({
      title: "Are you sure, you want to delete this user?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setLoading(true);
        deleteUser(record).then(() => setLoading(false));
      },
    });
  };

  const banUser = (record: User) => {
    let ban = { ...banData, id: record };
    setTestRecord(record);
    Modal.confirm({
      title: "BAN THIS ACCOUNT?",
      okText: "Ban",
      okType: "danger",
      onOk: () => {
        updateUser(record, ban);
      },
    });
  };

  const onEditUser = (record: User) => {
    setIsEditing(true);
    let data = { ...editFormData, id: record };
    setEditFormData(data);
    setTestRecord(record);
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditFormData(null);
  };

  const handleCardClick = (request: any) => {
    getUserId(request).then((res) => {
      setSelectedRequest(res);
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSearch = (searchText: string) => {
    setSearchInput(searchText);
    getUser().then((res) => {
      if (searchText === "") {
        setDataSource(res);
      } else {
        setDataSource(
          res.filter((item: any) =>
            item.nickname.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      }
    });
  };

  const handleSwitchChange = (checked: any) => {
    setEditFormData({ ...editFormData, status: checked ? true : false });
  };

  return (
    <Space size={20} direction="vertical">
      {contextHolder}
      {/* <Typography.Title level={4}>Users</Typography.Title> */}
      <div>
        <Input.Search
          placeholder="Search by name..."
          value={searchInput}
          // onSearch={(value) => handleSearch(value)}
          onChange={(e) => handleSearch(e.target.value)}
          enterButton
          style={{ width: "500px", marginTop: "10px" }}
        />
        <Button
          type="primary"
          loading={loading}
          onClick={onUpdateArtistRole}
          style={{ float: "right", margin: "10px 50px 0px 0px" }}
        >
          Update Users' Role
        </Button>
      </div>
      <Table<User>
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          {
            title: "Avatar",
            dataIndex: "avatar",
            render: (link: string) => {
              return <Avatar src={link} size={45} />;
            },
          },
          {
            title: "Name",
            dataIndex: "nickname",
          },
          {
            title: "Role",
            dataIndex: "role",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
              <span
                style={{
                  backgroundColor: status ? "green" : "red",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  color: "white",
                }}
              >
                {status ? "Online" : "Banned"}
              </span>
            ),
          },
          {
            title: "Action",
            dataIndex: "_id",
            align: "center",
            render: (record: User) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    fontSize: "20px",
                  }}
                >
                  <SolutionOutlined
                    onClick={() => {
                      handleCardClick(record);
                    }}
                  />
                  {/* <EditOutlined
                    onClick={() => {
                      onEditUser(record);
                    }}
                  /> */}
                  <StopOutlined
                    onClick={() => {
                      // onDeleteUser(record);
                      banUser(record);
                    }}
                    style={{ color: "red" }}
                  />
                </div>
              );
            },
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
      <Modal
        title="Edit User"
        open={isEditing}
        centered
        okText="Confirm"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          updateUser(testRecord, editFormData);
          resetEditing();
        }}
      >
        <div style={{ lineHeight: "2.5" }}>
          Name:{" "}
          <Input
            value={editFormData?.nickname}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, nickname: e.target.value };
              });
            }}
          />
          Email:{" "}
          <Input
            value={editFormData?.email}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          Role:{" "}
          {/* <Input
            value={editFormData?.role}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, role: e.target.value };
              });
            }}
          /> */}
          <Select
            value={editFormData?.role}
            options={options}
            style={{ width: 100, margin: "20px 20px 0px 0px" }}
            onChange={(value) => {
              setEditFormData((pre) => {
                return { ...pre, role: value };
              });
            }}
          />
          Status:{" "}
          <Switch value={editFormData?.status} onChange={handleSwitchChange} />
        </div>
      </Modal>

      <Modal
        title="User Information"
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={1000}
        centered
      >
        {selectedRequest && (
          <Table
            dataSource={[selectedRequest]}
            columns={[
              {
                title: "Username",
                dataIndex: "nickname",
                key: "nickname",
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
              },
              {
                title: "Role",
                dataIndex: "role",
                key: "role",
              },
              {
                title: "Followers",
                dataIndex: "numOfFollower",
                key: "follower",
              },
              {
                title: "Date Joined",
                dataIndex: "createdAt",
                key: "date",
              },
            ]}
            pagination={false}
          />
        )}
      </Modal>
    </Space>
  );
}

export default Users;
