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
import { number } from "yup";
interface ImageCard {
  user: string;
  name: string;
  tags: string[];
  numberOfLike: number;
  price: number;
  description: string;
  url: string;
  status: boolean;
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
  const [imageCards, setImageCards] = useState<ImageCard[]>([]);

  const handleImageUpload = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (imageCards.length < 10) {
        setImageCards([
          ...imageCards,
          {
            url: imageUrl,
            name: "",
            tags: [],
            description: "",
            price: 0,
            user: "",
            status: true,
            numberOfLike: 0,
          },
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
    value: string | number | string[]
  ) => {
    const newImageCards = [...imageCards];
    if (
      typeof value === "string" &&
      (key === "url" || key === "name" || key === "description")
    ) {
      newImageCards[index][key] = value;
    } else if (Array.isArray(value) && key === "tags") {
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

  //chatgpt
  const handleTagInputChange = (
    index: number,
    tagIndex: number,
    value: string
  ) => {
    const newImageCards = [...imageCards];
    newImageCards[index].tags[tagIndex] = value;
    setImageCards(newImageCards);
  };
  const handleAddTag = (index: number) => {
    const newImageCards = [...imageCards];
    newImageCards[index].tags.push("");
    setImageCards(newImageCards);
  };
  const handleRemoveTag = (index: number, tagIndex: number) => {
    const newImageCards = [...imageCards];
    newImageCards[index].tags.splice(tagIndex, 1);
    setImageCards(newImageCards);
  };

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
        // console.log("Current user: ", res.data);
        setCurrentUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchCurrentUserData();
  }, []);
  useEffect(() => {
    // console.log("Current user: ", currentUser);
  }, [currentUser]);
  //switch
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState<number | string>("");
  const handleSwitchChange = (checked: boolean, index: number) => {
    const updatedIsFreeArray = [...isFreeArray];
    updatedIsFreeArray[index] = !checked;
    setIsFreeArray(updatedIsFreeArray);
  };

  const [isFreeArray, setIsFreeArray] = useState<boolean[]>(
    Array(imageCards.length).fill(false)
  );

  const handleSubmit = () => {
    imageCards.forEach((image, index) => {
      console.log(`Image ${index + 1}:`);
      console.log(currentUser.id);

      console.log("URL:", image.url);
      console.log("Name:", image.name);
      console.log("Tags:", image.tags);
      console.log("Description:", image.description);

      // Get the latest price value from the input field
      const priceInput = document.getElementById(
        `price-input-${index}`
      ) as HTMLInputElement;
      const priceValue = priceInput.value;
      console.log(isFreeArray[index]);
      let imagePrice = !isFreeArray[index] ? 0 : priceValue; // Set imagePrice based on isFree
      console.log("Price:", imagePrice);
      const data = {
        user: currentUser.id,
        name: image.name,
        tags: image.tags,
        numOfLike: image.numberOfLike,
        price: imagePrice,
        description: image.description,
        imageUrl: image.url,
        status: true,
      };
      // console.log(data);
      fetch("http://localhost:5000/artworks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => {
          console.error("Error:", error);
        });
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
                <Card>
                  <Meta
                    avatar={
                      <Avatar src={currentUser.avatar} className="avt-user" />
                    }
                    title={currentUser.nickname}
                    description={
                      <>
                        {currentUser.email} <br />
                        <i>Role: {currentUser.role}</i>
                      </>
                    }
                  />
                </Card>
                <Input
                  placeholder="Name"
                  onChange={(e) =>
                    handleCardInputChange(index, "name", e.target.value)
                  }
                  className="input-name"
                  size="large"
                />

                {card.tags.map((tag, tagIndex) => (
                  <Space key={tagIndex}>
                    <Input
                      value={tag}
                      onChange={(e) =>
                        handleTagInputChange(index, tagIndex, e.target.value)
                      }
                      placeholder="Tag"
                      size="large"
                    />
                    <Button
                      onClick={() => handleRemoveTag(index, tagIndex)}
                      shape="circle"
                      icon={<CloseOutlined />}
                    />
                  </Space>
                ))}
                <Button onClick={() => handleAddTag(index)}>Add Tag</Button>
                <div className="option-price">
                  <div
                    style={{
                      opacity: isFreeArray[index] ? 0.2 : 1,
                      marginRight: "10px",
                    }}
                  >
                    Free for everyone
                  </div>
                  <Switch
                    checked={!isFreeArray[index]}
                    onChange={(checked) => handleSwitchChange(checked, index)}
                  />

                  <div
                    className="price"
                    style={{
                      opacity: isFreeArray[index] ? 1 : 0.2,
                      marginLeft: "10px",
                    }}
                  >
                    Price:
                    <Input
                      id={`price-input-${index}`} // Unique ID for each input
                      disabled={!isFreeArray[index]}
                      style={{
                        width: "100px",
                        border: "1px solid",
                        marginLeft: "5px",
                      }}
                      // value={price.toString()}
                      onChange={(e) => {
                        handleCardInputChange(index, "price", e.target.value);
                      }}
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
