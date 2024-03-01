import { Avatar, Space, Table, Typography, Modal } from "antd";
import { useEffect, useState } from "react";
import { getRequest, updateRequest } from "../../../api/requestAPI/requestAPI";
import { EditOutlined } from "@ant-design/icons";

function Request() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [approveData, setApproveData] = useState({
    status: true,
  });

  useEffect(() => {
    setLoading(true);
    getRequest().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }, []);

  const handleApprove = (record: any) => {
    let approve = { ...approveData, id: record };
    console.log("ID ARTWORK REQUESTED: ", record);
    console.log("APPROVE DATA: ", approve);
    Modal.confirm({
      title: "APPROVE THIS ARTWORK?",
      okText: "Confirm",
      onOk: () => {
        updateRequest(record, approve);
      },
    });
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Request</Typography.Title>
      <Table
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          {
            title: "Thumbnail",
            dataIndex: "attachment",
            render: (link: string) => (
              <Avatar shape="square" src={link} size={50} />
            ),
          },
          {
            title: "User",
            dataIndex: "userId",
            // render: (user) => (

            // )
          },
          {
            title: "Description",
            dataIndex: "description",
          },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) => String(status),
          },
          {
            title: "Action",
            dataIndex: "_id",
            render: (record: any) => {
              return (
                <>
                  <EditOutlined onClick={() => handleApprove(record)} />
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
    </Space>
  );
}
export default Request;
