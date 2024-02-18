import { Avatar, Rate, Space, Table, Typography, Modal, Image } from "antd";
import { useEffect, useState } from "react";
import { getArtwork, deleteArtwork } from "../../../api/index";
import { DeleteOutlined } from "@ant-design/icons";
// import {
//   getAllArtwork,
//   deleteArtwork,
// } from "../../../controller/artworkController";

function Artwork() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getArtwork().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }, []);

  const onDeleteArtwork = (record) => {
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

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Artwork</Typography.Title>
      <Table
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          {
            title: "Thumbnail",
            dataIndex: "imageUrl",
            render: (link) => {
              return <Image src={link} width={100} />;
            },
          },
          {
            title: "Name",
            dataIndex: "artworkName",
          },
          {
            title: "Artist",
            dataIndex: "artworkId",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Tags",
            dataIndex: "tags",
          },

          {
            title: "Description",
            dataIndex: "describe",
          },
          {
            title: "Action",
            dataIndex: "_id",
            render: (record) => {
              return (
                <>
                  <DeleteOutlined
                    onClick={() => {
                      onDeleteArtwork(record);
                    }}
                    style={{ color: "red" }}
                  />
                </>
              );
              // <Link to={"artwork/" + record.id}>Edit</Link>
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
export default Artwork;
