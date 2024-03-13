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
  tags: [string];
  numOfLike: number;
  price: number;
  description: string;
  imageUrl: string;
  createAt: Date;
  updatedAt: Date;
}

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

  return (
    <div className="Wrapper">
      <img
        src={
          "https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/374852207_3473181502955513_5066250399042915797_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeFK-YCTXTmYEZbuyizFU-9hMR_6p8bWSwExH_qnxtZLATUF4CJxoBYDUFxEiZ8BW7Su3Ot6k7vphoBITf1qMnsH&_nc_ohc=HdV6eApcuiEAX8vm2Gu&_nc_ht=scontent.fsgn16-1.fna&oh=00_AfA9ZIrDGIYoFRu2f1D-P8s-dTaNXGKvegN0I2RbdUsGkw&oe=65A7032A"
        }
        alt="artist avatar"
        className="avatar"
      />
    </div>
  );
};

export default Pin;
