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
  const [pin, setPin] = useState<PinProps[]>(pins);
  const [modalIndex, setModalIndex] = useState(-1);
  // console.log(pins);
  const [loading, setLoading] = useState(false);

  const showModal = (index: number) => {
    setModalIndex(index);
  };

  const hideModal = () => {
    setModalIndex(-1);
  };

  const handleLike = () => {
    message.success("Liked!");
    // Implement your like functionality here
  };

  const handleAdd = () => {
    message.success("Added!");
    // Implement your add functionality here
  };

  const handleDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
    const imageUrl = pins[modalIndex].imageUrl; // Assuming you have access to pins and modalIndex
    message.success("Downloading...");
    // Create a new anchor element
    const link = document.createElement("a");
    // Set the href attribute to the image URL
    link.href = imageUrl;
    // Set the download attribute to force download the image
    link.download = "image.jpg";
    // Append the anchor element to the body
    document.body.appendChild(link);
    // Programmatically click the anchor element to start downloading
    link.click();
    // Remove the anchor element from the DOM
    document.body.removeChild(link);
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
          <div className="Wrapper" key={index}>
            <div className="image">
              <div className="top-btn">
                <Button
                  size="large"
                  className="like-btn"
                  icon={<HeartFilled />}
                  onClick={handleLike}
                />
                <Button
                  size="large"
                  className="add-btn"
                  icon={<PlusOutlined />}
                  onClick={handleAdd}
                />
              </div>
              <div className="bottom-btn">
                <Button
                  size="large"
                  className="download-btn"
                  icon={<DownloadOutlined />}
                  onClick={handleDownload}
                />
              </div>
              <div className="artist-info">
                <img
                  src="https://i.pinimg.com/564x/30/2f/d4/302fd4ae9a9786bf3b637f7cbe1ae7b6.jpg"
                  alt="artist avatar"
                  className="avatar"
                />
                <div className="info">
                  <p className="name">{pin.userNickname}</p>
                  {/* <p className="tag">{pin.tag}</p> */}
                </div>
              </div>
              <img
                src={pin.imageUrl}
                alt="pin"
                onClick={() => showModal(index)}
              />
              <Modal
                style={{ top: 20 }}
                open={modalIndex === index}
                onCancel={hideModal}
                footer={null}
                width={1233}
                centered
                mask={false}
              >
                <div className="modal-content">
                  <div className="top-modal">
                    <div className="artist-info-modal">
                      <img
                        src="https://i.pinimg.com/564x/30/2f/d4/302fd4ae9a9786bf3b637f7cbe1ae7b6.jpg"
                        alt="artist avatar"
                        className="avatar"
                      />
                      <div className="info">
                        <p className="name-modal">{pin.userNickname}</p>
                        {/* <p className="tag">{pin.tag}</p> */}
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
                        className="download-btn"
                        icon={<DownloadOutlined />}
                        onClick={handleDownload}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="image-container">
                    <img className="img-modal" src={pin.imageUrl} alt="pin" />
                  </div>
                  <div className="bottom-section">
                    {/* <div className="download-count">
                      Downloads
                      <br /> <span>{pin.downloads}</span>
                    </div> */}
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
                    {/* <span>
                      <CalendarOutlined /> Published {pin.createAt}
                    </span> */}
                    <br />
                    <span>
                      <SafetyOutlined /> Free to use under the ArtAttack License
                    </span>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        ))}
      </div>
      <FloatButton.BackTop />
    </div>
  );
};

export default Mainboard;
