import { Avatar, Space, Table, Typography, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import { getArtworkId, deleteArtwork } from "../../../api/index";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import {
  deleteReport,
  getReportWithUserAndArtwork,
} from "../../../api/report/reportAPI";

const Report: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getReportWithUserAndArtwork().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }, []);

  const handleCardClick = (request: any) => {
    getArtworkId(request).then((res) => {
      setSelectedRequest(res);
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onDeleteArtwork = (record: any) => {
    console.log(record);
    Modal.confirm({
      title: "CONFIRM DELETE THIS ARTWORK?",
      okText: "Confirm",
      okType: "danger",
      onOk: () => {
        deleteArtwork(record);
      },
    });
  };

  const onDeleteReport = (record: any) => {
    Modal.confirm({
      title: "DECLINE THIS REPORT?",
      okText: "Confirm",
      onOk: () => {
        deleteReport(record);
      },
    });
  };

  const handleSearch = (searchText: string) => {
    setSearchInput(searchText);
    getReportWithUserAndArtwork().then((res) => {
      if (searchText === "") {
        setDataSource(res);
      } else {
        setDataSource(
          res.filter(
            (item: any) =>
              (item.user.nickname?.toLowerCase() || "").includes(
                searchText.toLowerCase()
              ) ||
              (item.description?.toLowerCase() || "").includes(
                searchText.toLowerCase()
              )
          )
        );
      }
    });
  };

  return (
    <Space size={20} direction="vertical">
      {/* <Typography.Title level={4}>Reports</Typography.Title> */}
      <div style={{ overflowX: "auto" }}>
        <Input.Search
          placeholder="Search by name, description..."
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          enterButton
          style={{ width: "500px", margin: "10px 0px 10px 0px" }}
        />
        <Table
          style={{ width: "1250px", minWidth: "100%" }}
          loading={loading}
          columns={[
            {
              title: "Thumbnail",
              dataIndex: "artwork",
              render: (link: any) => {
                return <Avatar shape="square" size={48} src={link.imageUrl} />;
              },
            },
            {
              title: "Name",
              dataIndex: "user",
              render: (name: any) => <span>{name.nickname}</span>,
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
              render: (record: any) => (
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
                    style={{ color: "blue" }}
                  />
                  <CheckCircleOutlined
                    onClick={() => {
                      onDeleteArtwork(record);
                    }}
                    style={{ color: "green" }}
                  />
                  <CloseCircleOutlined
                    onClick={() => {
                      onDeleteReport(record);
                    }}
                    style={{ color: "red" }}
                  />
                </div>
              ),
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
          }}
        />
        <Modal
          title="Report Information"
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
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Artist",
                  dataIndex: "user",
                  key: "user",
                },
                {
                  title: "Tags",
                  dataIndex: "tags",
                  key: "tags",
                },
                {
                  title: "Likes",
                  dataIndex: "numOfLike",
                  key: "likes",
                },
                {
                  title: "Description",
                  dataIndex: "description",
                  key: "description",
                },
              ]}
              pagination={false}
            />
          )}
        </Modal>
      </div>
    </Space>
  );
};

export default Report;
