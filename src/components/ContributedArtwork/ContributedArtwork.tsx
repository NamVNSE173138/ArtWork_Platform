import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Alert } from "antd";

interface ImageData {
  id: string;
}

const Contributed: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateImageObjects = () => {
      const imageObjects: ImageData[] = Array.from(
        { length: 10 },
        (_, index) => ({
          id: `image-${index + 1}`,
        })
      );
      setImages(imageObjects);
      setLoading(false);
    };

    generateImageObjects();
  }, []);

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message="Error fetching images" type="error" />;
  }

  // Split the images into two arrays
  const firstRowImages = images.slice(0, 5);
  const secondRowImages = images.slice(5, 10);

  return (
    <div>
      <Row gutter={[16, 24]} justify="center">
        {firstRowImages.map((image) => (
          <Col key={image.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <img
              src="https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={`Random Image ${image.id}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 24]} justify="center" style={{ marginTop: "16px" }}>
        {secondRowImages.map((image) => (
          <Col key={image.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <img
              src="https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={`Random Image ${image.id}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Contributed;
