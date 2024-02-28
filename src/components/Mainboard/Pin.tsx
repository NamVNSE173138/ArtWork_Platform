import { useEffect, useState } from "react";
import {
  CalendarOutlined,
  DownloadOutlined,
  HeartFilled,
  PlusOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { Button, Modal, message, Tag, Space } from "antd";
import "./Pin.css";
export interface PinProps {
  _id: string;
  user: string;
  name: string;
  tags: string;
  numOfLike: number;
  price: number;
  description: string;
  imageUrl: string;
  createAt: Date;
  updatedAt: Date;
}
const tags = [
  "Sossusvlei",
  "Namibia",
  "Tree Images & Pictures",
  "Desert Images",
  "Dawn",
  "Ground",
  "Hd Scenery Wallpapers",
  "Outdoors",
  "Nature Images",
  "Hd Grey Wallpapers",
  "Human",
  "People Images & Pictures",
  "Free Stock Photos",
];
const Pin: React.FC<PinProps> = ({
  _id,
  user,
  name,
  tags,
  numOfLike,
  price,
  description,
  imageUrl,
  createAt,
  updatedAt,
}) => {
  useEffect(() => {
    console.log("Pin Properties:", {
      _id,
      user,
      name,
      tags,
      numOfLike,
      price,
      description,
      imageUrl,
      createAt,
      updatedAt,
    });
  }, [
    _id,
    user,
    name,
    tags,
    numOfLike,
    price,
    description,
    imageUrl,
    createAt,
    updatedAt,
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    console.log("show modal");

    setModalVisible(true);
  };
  const handleLike = () => {
    message.success("Liked!");
    // Implement your like functionality here
  };

  const handleAdd = () => {
    message.success("Added!");
    // Implement your add functionality here
  };

  const handleDownload = () => {
    message.success("Downloading...");
    // Implement your download functionality here
  };

  const handleShare = () => {
    message.success("Share functionality goes here");
    // Implement your share functionality here
  };

  const handleReport = () => {
    message.success("Report functionality goes here");
    // Implement your report functionality here
  };

  return (
    <div className="Wrapper">
      <div className="image">
        <div className="top-btn">
          <Button size="large" className="like-btn" icon={<HeartFilled />} />
          <Button size="large" className="add-btn" icon={<PlusOutlined />} />
        </div>
        <div className="bottom-btn">
          <Button
            size="large"
            className="download-btn"
            icon={<DownloadOutlined />}
          />
        </div>
        <div className="artist-info">
          <img
            src={
              "https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/374852207_3473181502955513_5066250399042915797_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeFK-YCTXTmYEZbuyizFU-9hMR_6p8bWSwExH_qnxtZLATUF4CJxoBYDUFxEiZ8BW7Su3Ot6k7vphoBITf1qMnsH&_nc_ohc=HdV6eApcuiEAX8vm2Gu&_nc_ht=scontent.fsgn16-1.fna&oh=00_AfA9ZIrDGIYoFRu2f1D-P8s-dTaNXGKvegN0I2RbdUsGkw&oe=65A7032A"
            }
            alt="artist avatar"
            className="avatar"
          />
          <div className="info">
            <p className="name">{user}</p>
            <p className="tag">#nice</p>
          </div>
        </div>
        <img src={imageUrl} alt="pin" />
      </div>
    </div>
  );
};

export default Pin;
