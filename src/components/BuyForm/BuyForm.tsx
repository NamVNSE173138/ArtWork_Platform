import { useState } from "react";
import { Button, Modal, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addToCart } from "../../api/cart/cartAPI";
import { getArtworkId } from "../../api";

interface BuyData {
  artwork?: string;
  user?: string;
  price?: number;
}

const ReportForm = (record: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<BuyData | null>({
    artwork: "",
    user: "",
    price: 0,
  });

  console.log("yolo: ", record);

  const showModal = () => {
    setIsModalOpen(true);
    getArtworkId(record.artwork).then((res) => {
      console.log("RES: ", res);
      setFormData({
        ...formData,
        artwork: res._id,
        user: record.user,
        price: res.price,
      });
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      ...formData,
      artwork: "",
      user: "",
      price: 0,
    });
  };

  const handleSubmit = (event: any) => {
    setIsModalOpen(false);
    event.preventDefault();
    addToCart(formData);
    setFormData({
      ...formData,
      artwork: "",
      user: "",
      price: 0,
    });
    message.success("Added To Cart!!!");
  };

  console.log("BUY: ", formData);

  return (
    <>
      <Button
        style={{ float: "right", marginRight: "50px" }}
        size="large"
        onClick={showModal}
        icon={<ShoppingCartOutlined />}
      >
        Add To Cart
      </Button>
      <Modal
        style={{ textAlign: "center" }}
        width={500}
        open={isModalOpen}
        onOk={handleSubmit}
        okText="Confirm"
        onCancel={handleCancel}
        centered
      >
        <h3>ADD THIS ARTWORK TO CART?</h3>
      </Modal>
    </>
  );
};

export default ReportForm;
