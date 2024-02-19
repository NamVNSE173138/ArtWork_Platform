import { Avatar, Space, Table, Typography, Modal, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getUser, deleteUser } from "../../../api/index";

interface User {
  avatar: string;
  nickname: string;
  role: string;
  email: string;
  status: { status: string };
  _id: string;
}

interface EditFormData {
  nickname?: string;
  email?: string;
}

function Users() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<EditFormData | null>({
    nickname: "",
    email: "",
  });

  useEffect(() => {
    setLoading(true);
    getUser().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }, []);

  const onDeleteUser = (record: User) => {
    console.log(record);
    Modal.confirm({
      title: "Are you sure, you want to delete this user?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteUser(record);
      },
    });
  };

  const onEditUser = (record: User) => {
    setIsEditing(true);
    setEditFormData({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditFormData(null);
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Users</Typography.Title>
      <Table<User>
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          {
            title: "Avatar",
            dataIndex: "avatar",
            render: (link: string) => {
              return <Avatar src={link} />;
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
            render: (status: { status: string }) => {
              return <span>{status.status}</span>;
            },
          },
          {
            title: "Action",
            dataIndex: "_id",
            render: (record: User) => {
              return (
                <>
                  <EditOutlined
                    onClick={() => {
                      onEditUser(record);
                    }}
                  />
                  <DeleteOutlined
                    onClick={() => {
                      onDeleteUser(record);
                    }}
                    style={{ color: "red" }}
                  />
                </>
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
        okText="Confirm"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          resetEditing();
        }}
      >
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
      </Modal>
    </Space>
  );
}

export default Users;
