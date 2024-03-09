import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Input,
  Button,
  Radio,
  Checkbox,
  Space,
  InputRef,
  Tooltip,
  Tag,
  theme,
  Avatar,
  Switch,
  Row,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./UploadForm.css";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
interface ImageCard {
  url: string;
  name: string;
  tags: string;
  description: string;
  price: number;
}
interface User {
  id: string;
  email: string;
  nickname: string;
  role: string;
  numOfFollower: number;
  avatar: string;
  password: string;
  status: boolean;
  createAt?: string;
  updateAt?: string;
}
const UploadImageForm: React.FC = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageTags, setImageTags] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [imageCards, setImageCards] = useState<ImageCard[]>([]);

  const handleImageUpload = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (imageCards.length < 10) {
        setImageCards([
          ...imageCards,
          { url: imageUrl, name: "", tags: "", description: "", price: 0 },
        ]);
        setImageUrl("");
      } else {
        console.log("duoi 10 images");
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  type ImageCardKey = keyof ImageCard;

  const handleCardInputChange = (
    index: number,
    key: ImageCardKey,
    value: string | number
  ) => {
    const newImageCards = [...imageCards];
    if (
      typeof value === "string" &&
      (key === "url" ||
        key === "name" ||
        key === "tags" ||
        key === "description")
    ) {
      newImageCards[index][key] = value;
    } else if (typeof value === "number" && key === "price") {
      newImageCards[index][key] = value;
    }
    setImageCards(newImageCards);
  };

  const handleRemoveCard = (index: number) => {
    const newImageCards = [...imageCards];
    newImageCards.splice(index, 1);
    setImageCards(newImageCards);
  };
  const { token } = theme.useToken();
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string, index: number) => {
    let newTags = [...tags];
    newTags = newTags.filter((tag, i) => i !== index);
    setTags(newTags);
    if (editInputIndex === index) {
      setEditInputIndex(-1); // Reset editInputIndex
    }
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const tagInputStyle: React.CSSProperties = {
    width: 99,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    fontSize: "16px",
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };
  const userToken = localStorage.getItem("USER");

  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    email: "",
    password: "",
    nickname: "",
    role: "",
    numOfFollower: 0,
    avatar: "",
    status: false,
    createAt: "",
    updateAt: "",
  });
  const fetchCurrentUserData = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:5000/users/getUserInfo`, {
        headers: {
          token: userToken, //userToken = localStorage("USER")
        },
      })
      .then((res) => {
        console.log("Current user: ", res.data);
        setCurrentUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchCurrentUserData();
  }, []);
  useEffect(() => {
    console.log("Current user: ", currentUser);
  }, [currentUser]);
  //switch
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const handleSwitchChange = (checked: boolean) => {
    setIsFree(!checked);
  };
  const handleSubmit = () => {
    imageCards.forEach((image, index) => {
      console.log(`Image ${index + 1}:`);
      console.log("URL:", image.url);
      console.log("Name:", image.name);
      console.log("Tags:", image.tags);
      console.log("Description:", image.description);
      if (!isFree) {
        console.log("Price:", image.price); // Log price if not free
      }
    });
  };

  return (
    <>
      <h2>Upload Photos</h2>
      <h4 className="title">Import from URL</h4>
      <div className="upload-image-form">
        <Input
          placeholder="Add image URL"
          onChange={handleInputChange}
          onKeyDown={handleImageUpload}
          value={imageUrl}
          size="large"
          className="image-url-input"
        />
        {imageCards.map((card, index) => (
          <div className="image-card-container" key={index}>
            <div className="btn-card">
              <h4>Image: {index + 1}</h4>
              <Checkbox className="radio-checkout" />
              <br />
              <Button
                type="text"
                shape="circle"
                icon={<DeleteOutlined style={{ fontSize: "30px" }} />}
                onClick={() => handleRemoveCard(index)}
                className="button-remove"
                danger
              />
            </div>

            <div className="card-container">
              <img alt="example" src={card.url} className="image-card" />
              <div className="input-container">
                <Input
                  placeholder="Name"
                  onChange={(e) =>
                    handleCardInputChange(index, "name", e.target.value)
                  }
                  className="input-name"
                  size="large"
                />
                <Card>
                  <Meta
                    avatar={<Avatar src={currentUser.avatar} />}
                    title={currentUser.nickname}
                    description={
                      <>
                        {currentUser.email} <br />
                        <i>Role: {currentUser.role}</i>
                      </>
                    }
                  />
                </Card>

                <Space size={[0, 8]} wrap className="tags">
                  {tags.map((tag, index) => {
                    if (editInputIndex === index) {
                      return (
                        <Input
                          ref={editInputRef}
                          key={tag}
                          size="small"
                          style={tagInputStyle}
                          value={editInputValue}
                          onChange={handleEditInputChange}
                          onBlur={handleEditInputConfirm}
                          onPressEnter={handleEditInputConfirm}
                        />
                      );
                    }
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag
                        key={tag}
                        closable={true}
                        style={{ userSelect: "none" }}
                        onClose={() => handleClose(tag, index)}
                      >
                        <span
                          onDoubleClick={(e) => {
                            if (index !== 0) {
                              setEditInputIndex(index);
                              setEditInputValue(tag);
                              e.preventDefault();
                            }
                          }}
                        >
                          {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </span>
                      </Tag>
                    );
                    return isLongTag ? (
                      <Tooltip title={tag} key={tag}>
                        {tagElem}
                      </Tooltip>
                    ) : (
                      tagElem
                    );
                  })}
                  {inputVisible ? (
                    <Input
                      ref={inputRef}
                      type="text"
                      size="large"
                      style={tagInputStyle}
                      value={inputValue}
                      onChange={handleInputTagChange}
                      onBlur={handleInputConfirm}
                      onPressEnter={handleInputConfirm}
                    />
                  ) : (
                    <Tag
                      style={tagPlusStyle}
                      icon={<PlusOutlined />}
                      onClick={showInput}
                    >
                      New Tag
                    </Tag>
                  )}
                </Space>
                <div className="option-price">
                  <div
                    style={{ opacity: isFree ? 0.2 : 1, marginRight: "10px" }}
                  >
                    Free for everyone
                  </div>
                  <Switch checked={!isFree} onChange={handleSwitchChange} />
                  <div
                    className="price"
                    style={{ opacity: isFree ? 1 : 0.2, marginLeft: "10px" }}
                  >
                    Price:
                    <Input
                      style={{
                        width: "100px",
                        border: "1px solid",
                        marginLeft: "5px",
                      }}
                      value={price.toString()} // Set the value of the input field to the price state
                      onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                  </div>
                </div>
                <TextArea
                  placeholder="Description"
                  onChange={(e) =>
                    handleCardInputChange(index, "description", e.target.value)
                  }
                  className="input-description"
                  size="large"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </div>
            </div>
          </div>
        ))}
        <div style={{ width: "60%", marginBottom: "40px" }}>
          {imageCards.length > 0 && (
            <Button
              type="primary"
              onClick={handleSubmit}
              size="large"
              className="post-btn"
            >
              Post
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadImageForm;
