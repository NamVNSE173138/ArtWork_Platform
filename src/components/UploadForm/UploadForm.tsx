// Import necessary modules and components
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  UploadProps,
  Image,
  Row,
  Col,
} from "antd";
import type { UploadFile } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import axios, { AxiosResponse } from "axios";
import "./UploadForm.css";

const fileList: UploadFile[] = [
  {
    uid: "-1",
    name: "yyy.png",
    status: "done",
    url: "https://images.unsplash.com/photo-1703884051748-2bdce28d166e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8fA%3D%3D",
    thumbUrl:
      "https://images.unsplash.com/photo-1703884051748-2bdce28d166e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8fA%3D%3D",
  },
];
const UploadImageForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    if (!file) {
      message.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("tag", values.tag);
    formData.append("image", file);

    try {
      const response: AxiosResponse<{ url: string }> = await axios.post(
        "YOUR_API_ENDPOINT",
        formData
      );

      setImageUrl(response.data.url);
      message.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Failed to upload image");
    }
  };

  const onFileChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImageUrl(info.file.response?.url || ""); // Assuming the response contains the image URL
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }

    const uploadedFile = info.fileList[0]?.originFileObj; // Use optional chaining to handle undefined
    if (uploadedFile) {
      setFile(uploadedFile);
    } else {
      setFile(null);
    }
  };

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <Form
      {...formLayout}
      name="uploadImage"
      onFinish={onFinish}
      className="upload-form"
      layout="vertical"
    >
      <Row>
        <Col flex={1}>
          <div className="upload-left">
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please upload an image" }]}
              valuePropName="fileList"
              getValueFromEvent={onFileChange}
            >
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                defaultFileList={[...fileList]}
                className="upload-list-inline"
              >
                <Button size="large" icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>
          </div>
        </Col>
        <Col flex={4}>
          <div className="upload-right">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Tag"
              name="tag"
              rules={[{ required: true, message: "Please enter the tag" }]}
            >
              <Input />
            </Form.Item>
          </div>
        </Col>
      </Row>

      {imageUrl && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Image src={imageUrl} alt="Uploaded Image" width={200} />
        </div>
      )}

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button type="primary" htmlType="submit">
          Upload
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UploadImageForm;
