import { Avatar, Space, Table, Typography, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import { getArtwork, getArtworkId, deleteArtwork } from "../../../api/index";
import { DeleteOutlined, SolutionOutlined } from "@ant-design/icons";

interface ArtworkRecord {
  imageUrl: string;
  artworkName: string;
  artworkId: string;
  price: number;
  tags: string[];
  describe: string;
  _id: string;
}

const Artwork: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState<ArtworkRecord[]>([]);

  useEffect(() => {
    setLoading(true);
    getArtwork().then((res: ArtworkRecord[]) => {
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

  const onDeleteArtwork = (record: ArtworkRecord) => {
    console.log(record);
    Modal.confirm({
      title: "Are you sure, you want to delete this artwork?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteArtwork(record);
      },
    });
  };

  const handleSearch = (searchText: string) => {
    setSearchInput(searchText);
    getArtwork().then((res) => {
      if (searchText === "") {
        setDataSource(res);
      } else {
        setDataSource(
          res.filter(
            (item: any) =>
              (item.name?.toLowerCase() || "").includes(
                searchText.toLowerCase()
              ) ||
              (item.tags?.toLowerCase() || "").includes(
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
      {/* <Typography.Title level={4}>Artwork</Typography.Title> */}
      <div style={{ overflowX: "auto" }}>
        <Input.Search
          placeholder="Search by name, tag, description..."
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          enterButton
          style={{ width: "500px", margin: "10px 0px 10px 0px" }}
        />
        <Table<ArtworkRecord>
          style={{ width: "1250px", minWidth: "100%" }}
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
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Artist",
              dataIndex: "user",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value: number) => <span>${value}</span>,
            },
            {
              title: "Tags",
              dataIndex: "tags",
            },
            {
              title: "Description",
              dataIndex: "description",
            },
            {
              title: "Action",
              dataIndex: "_id",
              render: (record: ArtworkRecord) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <SolutionOutlined
                    onClick={() => {
                      handleCardClick(record);
                    }}
                  />
                  <DeleteOutlined
                    onClick={() => {
                      onDeleteArtwork(record);
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
          title="Artwork Information"
          open={modalVisible}
          onCancel={closeModal}
          footer={null}
          width={1000}
          centered
        >
          {selectedRequest && (
            <Table
              dataSource={selectedRequest}
              columns={[
                {
                  title: "Artwork",
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
                  title: "Price",
                  dataIndex: "price",
                  key: "price",
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

export default Artwork;
