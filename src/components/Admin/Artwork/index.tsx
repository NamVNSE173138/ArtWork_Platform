import { Avatar, Rate, Space, Table, Typography, Modal, Image } from "antd";
import { useEffect, useState } from "react";
import { getArtwork, deleteArtwork } from "../../../api/index";
import { DeleteOutlined } from "@ant-design/icons";

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
  const [dataSource, setDataSource] = useState<ArtworkRecord[]>([]);

  useEffect(() => {
    setLoading(true);
    getArtwork().then((res: ArtworkRecord[]) => {
      setDataSource(res);
      setLoading(false);
    });
  }, []);

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

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Artwork</Typography.Title>
      <Table<ArtworkRecord>
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          {
            title: "Thumbnail",
            dataIndex: "imageUrl",
            render: (link: string) => <Image src={link} width={100} />,
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
            render: (value: number) => <span>${value}</span>,
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
            render: (record: string) => (
              <>
                <DeleteOutlined
                  onClick={() => {
                    onDeleteArtwork({ _id: record } as ArtworkRecord);
                  }}
                  style={{ color: "red" }}
                />
              </>
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      />
    </Space>
  );
};

export default Artwork;
