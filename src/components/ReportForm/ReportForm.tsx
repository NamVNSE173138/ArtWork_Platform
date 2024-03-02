import { useState } from "react";
import {
  Button,
  Form,
  Modal,
  Input,
  Space,
  message,
  Row,
  Col,
  Checkbox,
} from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { createReport } from "../../api/report/reportAPI";

interface ReportData {
  artwork?: string;
  user?: string;
  description?: string;
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
              name="offense"
              label="Please select a problem"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please select at least one offense.",
              //   },
              // ]}
            >
              <Checkbox.Group style={{ width: "100%" }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Checkbox value="A" style={{ fontSize: "18px" }}>
                      NUDITY
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="B" style={{ fontSize: "18px" }}>
                      VIOLENCE
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="C" style={{ fontSize: "18px" }}>
                      OFFENSIVE NAME
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="D" style={{ fontSize: "18px" }}>
                      SENSITIVE CONTENT
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="E" style={{ fontSize: "18px" }}>
                      TERRORISM
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="F" style={{ fontSize: "18px" }}>
                      DISRESPECT
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="G" style={{ fontSize: "18px" }}>
                      FALSE INFORMATION
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="H" style={{ fontSize: "18px" }}>
                      HARASSMENT
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="I" style={{ fontSize: "18px" }}>
                      INVOLVES A CHILD
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
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
