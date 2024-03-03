import { Avatar, Space, Table, Typography, Modal } from "antd";
import { useEffect, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { deleteArtwork, getArtwork, updateArtwork } from "../../../api/index";

interface ArtworkRecord {
  imageUrl: string;
  artworkName: string;
  artworkId: string;
  price: number;
  tags: string[];
  describe: string;
  _id: string;
}

interface ApproveData {
  status?: boolean;
}

function Request() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<ArtworkRecord[]>([]);
  const [approveData, setApproveData] = useState<ApproveData>({
    status: true,
  });

  useEffect(() => {
    setLoading(true);
    getArtwork().then((res) => {
      setDataSource(res.filter((item: any) => item.status === false));
      setLoading(false);
    });
  }, []);

  const handleApprove = (record: any) => {
    let approve = { ...approveData, id: record };
    setApproveData(approve);
    Modal.confirm({
      title: "APPROVE THIS ARTWORK?",
      okText: "Confirm",
      onOk: () => {
        updateArtwork(record, approveData);
      },
    });
  };

  const handleDisapprove = (record: any) => {
    Modal.confirm({
      title: "DECLINE THIS REQUEST?",
      okText: "Confirm",
      okType: "danger",
      onOk: () => {
        deleteArtwork(record);
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
            dataIndex: "imageUrl",
            render: (link: string) => (
              <Avatar shape="square" src={link} size={50} />
            ),
          },
          {
            title: "User",
            dataIndex: "userId",
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
            align: "center",
            render: (record: any) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    fontSize: "20px",
                  }}
                >
                  <CheckCircleOutlined
                    style={{ color: "#52c41a" }}
                    onClick={() => handleApprove(record)}
                  />
                  <CloseCircleOutlined
                    style={{ color: "red" }}
                    onClick={() => handleDisapprove(record)}
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
    </Space>
  );
}
export default Request;
