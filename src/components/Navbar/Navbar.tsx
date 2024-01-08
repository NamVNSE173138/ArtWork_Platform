// Navbar.tsx

import React, { useState } from "react";
import "./Navbar.css"; // Assuming you have a corresponding CSS file
import { Input, Space, Button } from "antd";
import Logo from "../../assets/image/e1eb03f8282b4f89a438983023e90697 (1).png";

// const links = Array.from({ length: 15 }, (_, index) => `Link ${index + 1}`);
const { Search } = Input;
const links = [
  "Minimalism",
  "Wallpapers",
  "3D Renders",
  "Nature",
  "Architecture & Interiors",
  "Experimental",
  "Textures & Patterns",
  "Film",
  "Travel",
  "Street Photography",
  "Animals",
  "Food & Drink",
  "People",
  "Health & Wellness",
  "Spirituality",
  "Current Events",
  "Fashion & Beauty",
  "Bunsiness & Work",
  "Arts & Culture",
  "Sports",
];
const Navbar: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [nextClickCount, setNextClickCount] = useState(0);

  const handleNextClick = () => {
    if (nextClickCount < 4) {
      setStartIndex((prevIndex) => prevIndex + 3);
      setNextClickCount((prevCount) => prevCount + 1);
    }
  };

  const handlePrevClick = () => {
    if (nextClickCount > 0) {
      setStartIndex((prevIndex) => prevIndex - 3);
      setNextClickCount((prevCount) => prevCount - 1);
    }
  };

  const calculateMarginLeft = () => `-${startIndex * 20}%`;
  const onSearch = (value: string) => {
    console.log("Search value:", value);
    // You can perform additional actions here
  };
  return (
    <nav className="navbar">
      <div className="first-line">
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <div className="search-box">
            <Space direction="vertical">
              <Search
                placeholder="Input search text"
                onSearch={onSearch}
                enterButton
                style={{ width: 500 }}
              />
            </Space>
          </div>
        </div>
        <div className="user-actions">
          <Button>Login</Button>
          <Button>Signup</Button>
        </div>
      </div>
      <div className="second-line">
        <button className="nav-buttons" onClick={handlePrevClick}>
          {"<"}
        </button>
        <div style={{ marginLeft: "55px" }}>
          <div
            className="nav-links"
            style={{
              marginLeft: calculateMarginLeft(),
              transition: "margin 0.5s ease",
            }}
          >
            {links.map((link, index) => (
              <a key={index}>{link}</a>
            ))}
          </div>
        </div>
        <button className="nav-buttons" onClick={handleNextClick}>
          {">"}
        </button>
      </div>
      <div style={{ width: "10px", display: "flex", whiteSpace: "nowrap" }}>
        {links.map((link, index) => (
          <a key={index}>{link}</a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
