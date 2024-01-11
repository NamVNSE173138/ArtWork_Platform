// Mainboard.tsx
import React from "react";
import Pin from "./Pin";
import "./Mainboard.css";
import { FloatButton } from "antd";
interface PinProps {
  urls: {
    regular: string;
  };
}

interface MainboardProps {
  pins: PinProps[];
}

const Mainboard: React.FC<MainboardProps> = ({ pins }) => {
  return (
    <div className="mainboard_wrapper">
      <div className="mainboard_container">
        {pins.map((pin, index) => {
          let { urls } = pin;
          return <Pin key={index} urls={urls} />;
        })}
      </div>
      <FloatButton.BackTop />
    </div>
  );
};

export default Mainboard;
