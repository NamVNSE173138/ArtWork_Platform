import React, { useState } from "react";
import Pin, { PinProps } from "./Pin";
import "./Mainboard.css";
import "./Pin.css";
import { Button, FloatButton, Modal, Space, message } from "antd";
import {
  CalendarOutlined,
  DownloadOutlined,
  HeartFilled,
  PlusOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

interface MainboardProps {
  pins: PinProps[];
}

const Mainboard: React.FC<MainboardProps> = ({ pins }) => {
  console.log("Mainboard Pins:", pins);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
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
    <div className="mainboard_wrapper">
      <div className="mainboard_container">
        {pins.map((pin, index) => (
          <div className="Wrapper">
            <div className="image">
              <div className="top-btn">
                <Button
                  size="large"
                  className="like-btn"
                  icon={<HeartFilled />}
                />
                <Button
                  size="large"
                  className="add-btn"
                  icon={<PlusOutlined />}
                />
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
                  <p className="name">Cun</p>
                  <p className="tag">#nice</p>
                </div>
              </div>
              <img src={pin.imageUrl} alt="pin" onClick={showModal} />
              <Modal
                style={{ top: 20 }}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={1233}
                centered
                mask={false}
              >
                <div className="modal-content">
                  <div className="top-modal">
                    <div className="artist-info-modal">
                      <img
                        src={
                          "https://images.unsplash.com/photo-1682686579688-c2ba945eda0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt="artist avatar"
                        className="avatar"
                      />
                      <div className="info">
                        <p className="name">Cun</p>
                        <p className="tag">#kk</p>
                      </div>
                    </div>
                    <div className="modal-btns">
                      <Button
                        size="large"
                        className="like-modal-btn"
                        icon={<HeartFilled />}
                        onClick={handleLike}
                      />
                      <Button
                        size="large"
                        className="add-modal-btn"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                      />

                      <Button
                        size="large"
                        className="download-modal-btn"
                        icon={<DownloadOutlined />}
                        onClick={handleDownload}
                      >
                        {" "}
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="image-container">
                    <img className="img-modal" src={pin.imageUrl} alt="pin" />
                  </div>
                  <div className="bottom-section">
                    <div className="download-count">
                      Downloads
                      <br /> <span>5,432</span>
                    </div>
                    <div className="actions">
                      <Button
                        className="share-btn"
                        size="large"
                        onClick={handleShare}
                      >
                        Share
                      </Button>
                      <Button
                        className="report-btn"
                        size="large"
                        onClick={handleReport}
                      >
                        Report
                      </Button>
                    </div>
                  </div>
                  <div className="img-detail">
                    <span>
                      <CalendarOutlined /> Pushlished 12 days ago
                    </span>
                    <br />
                    <span>
                      <SafetyOutlined /> Free to use under the ArtAttack License
                    </span>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
          // <Pin key={index} {...pin} />
        ))}
      </div>
      <FloatButton.BackTop />
    </div>
  );
};

export default Mainboard;
