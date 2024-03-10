import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  Cascader,
  DatePicker,
  Descriptions,
  Form,
  FormInstance,
  Input,
  InputNumber,
  InputRef,
  List,
  Mentions,
  Modal,
  Select,
  Space,
  Tag,
  Tooltip,
  TreeSelect,
  theme,
} from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "./ArtistList.css";
import TextArea from "antd/es/input/TextArea";

const ArtistList = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      const formData = formRef.current?.getFieldsValue();
      console.log(
        "Name of artwork:",
        formData.name,
        ",Tag:",
        tags,
        ",Prices:",
        formData.prices,
        ", Description:",
        formData.description
      );
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const formRef = useRef<FormInstance>(null);
  interface UserData {
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
  const [artistData, setArtistData] = useState<UserData[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/users/artists")
      .then((response) => response.json())
      .then((data: UserData[]) => {
        setArtistData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  //tag
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

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <>
      <h1>Choose an artist</h1>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }}
        className="artist-list"
        itemLayout="vertical"
        size="large"
        // pagination={{ pageSize: 6 }}
        dataSource={artistData}
        renderItem={(item: any) => (
          <List.Item key={item._id}>
            <Card style={{ width: "100%" }} actions={[]}>
              <Card.Meta
                avatar={<Avatar src={item.avatar} />}
                title={
                  <div className="nickname">
                    <Link to={`/artistList/${item._id}`}>{item.nickname}</Link>
                  </div>
                }
                description={
                  <>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      Follower: {item.numOfFollower}
                    </span>
                    <br />
                    <i>{item.bio}</i>
                  </>
                }
              />
              <div className="artist-action">
                <Button className="btn-fl" icon={<PlusCircleOutlined />}>
                  Follow
                </Button>
                {/* <Button className="btn-fl" onClick={showModal}> */}
                <Button className="btn-fl" onClick={() => navigate(`/request/requirements/${item._id}`)}>
                  Request to make artwork
                </Button>
                <Modal
                  mask={false}
                  open={open}
                  title="Request Form"
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={[
                    <Button key="back" onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      loading={loading}
                      onClick={handleOk}
                    >
                      Submit
                    </Button>,
                    <Button key="id">{item._id}</Button>,
                  ]}
                >
                  <Form
                    {...formItemLayout}
                    // variant="filled"
                    style={{ maxWidth: 600 }}
                    ref={formRef}
                  >
                    <Form.Item
                      label="Name of artwork"
                      name="name"
                      rules={[{ required: true, message: "Please input!" }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Tag"
                      name="tag"
                      rules={[{ required: true, message: "Please input!" }]}
                    >
                      <Space size={[0, 8]} wrap>
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
                              closable={index !== 0}
                              style={{ userSelect: "none" }}
                              onClose={() => handleClose(tag)}
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
                            size="small"
                            style={tagInputStyle}
                            value={inputValue}
                            onChange={handleInputChange}
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
                    </Form.Item>

                    <Form.Item
                      label="Prices"
                      name="prices"
                      rules={[{ required: true, message: "Please input!" }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Des"
                      name="description"
                      rules={[{ required: true, message: "Please input!" }]}
                    >
                      <TextArea />
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default ArtistList;