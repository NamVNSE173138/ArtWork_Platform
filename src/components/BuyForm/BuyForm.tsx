import { useState } from "react";
import {
  Button,
  Form,
  Modal,
  Input,
  Space,
  message,
} from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { createReport } from "../../api/report/reportAPI";

interface ReportData {
  artwork?: string;
  user?: string;
  description?: string;
  status?: boolean;
}

interface BuyData {
  artwork?: string;
  user?: string;
  status?: boolean;
}

const ReportForm = (record: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ReportData | null>({
    artwork: "",
    user: "65bc7471c22e1a44d323b6a0",
    description: "",
    status: false,
  });

  // console.log("Report Artwork ID: ", record);

  const showModal = () => {
    setIsModalOpen(true);
    setFormData({
      ...formData,
      artwork: record.artwork,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      ...formData,
      artwork: "",
      user: "65bc7471c22e1a44d323b6a0",
      description: "",
      status: false,
    });
  };

  const handleSubmit = (event: any) => {
    setIsModalOpen(false);
    event.preventDefault();
    createReport(formData);
    setFormData({
      ...formData,
      artwork: "",
      user: "65bc7471c22e1a44d323b6a0",
      description: "",
      status: false,
    });
    message.success("Report Successful!!!");
  };

  console.log("Report Data: ", formData);

  return (
    <>
      <Button
        style={{ float: "right", marginRight: "50px" }}
        size="large"
        onClick={showModal}
        icon={<WarningOutlined />}
      >
        Report
      </Button>
      <Modal
        title="REPORT"
        style={{ textAlign: "center" }}
        width={1000}
        open={isModalOpen}
        onOk={handleSubmit}
        okText="Submit"
        onCancel={handleCancel}
        centered
      >
        <Form layout="vertical">
          <Space direction="vertical">
            <Form.Item
              name="description"
              label="Description of the offense(s):"
            >
              <Input.TextArea
                rows={5}
                value={formData?.description}
                onChange={(e) => {
                  setFormData((pre) => {
                    return { ...pre, description: e.target.value };
                  });
                }}
                placeholder="If you can, please provide a detailed description of the offense(s)"
              />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default ReportForm;
