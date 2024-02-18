import { Avatar, Space, Table, Typography, Modal, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getUser, deleteUser } from "../../../api/index";

function Users() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    // id: 0,
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

  const onDeleteUser = (record) => {
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

  const onEditUser = (record) => {
    setIsEditing(true);
    setEditFormData({ ...record });
    // const { id } = editFormData;
    // setEditFormData({ ...id, [id]: record });
    // console.log("EDIT PRODUCT", editFormData.id);
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditFormData(null);
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Users</Typography.Title>
      <Table
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          {
            title: "Avatar",
            dataIndex: "avatar",
            render: (link) => {
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
            render: (status) => {
              return <span>{status.status}</span>;
            },
          },
          {
            title: "Action",
            dataIndex: "_id",
            render: (record) => {
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
          // setDataSource((pre) => {
          //   return pre.map((product) => {
          //     if (product.id === editFormData.id) {
          //       return editFormData;
          //     } else {
          //       return product;
          //     }
          //   });
          // });
          // const { record } = editFormData;
          // handleSubmit(record);
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
