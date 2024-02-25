import React, { useEffect, useRef, useState } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { Row, Col, Button } from "antd";
import HomeImg from "../../assets/image/Home.png";
import UploadImg from "../../assets/image/Upload.png";
import {
  ArrowRightOutlined,
  MonitorOutlined,
  SearchOutlined,
} from "@ant-design/icons";
// import { Schema, model, connect } from "mongoose";

import styles from "./styles.module.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Navigator() {
  const parallax = useRef<IParallax>(null!);
  interface IUser {
    userId: number;
    nickname: string;
    email: string;
    password: string;
    role: string;
    createTime: Date;
    numOfFollower: number;
    avatar?: string;
    status: boolean;
  }
  interface Pin {
    _id: string;
    artworkId: number;
    userId: number;
    artworkName: string;
    createTime: Date;
    tags: string;
    numOfLike: number;
    price: string;
    describe: string;
    imageUrl: string;
  }
  interface ArtworkResponse {
    data: Pin[];
  }
  //   const userSchema = new Schema<IUser>({
  //     userId: { type: Number, required: true },
  //     nickname: { type: String, required: true },
  //     email: { type: String, required: true },
  //     avatar: String,
  //   });

  //   const User = model<IUser>("User", userSchema);
  const [user, setUser] = useState<IUser>();

  //   async function run() {
  //     // 4. Connect to MongoDB
  //     await connect(
  //       "mongodb+srv://vonhatnam:vonhatnam@cluster0.u60utzk.mongodb.net/"
  //     );

  //     const user = new User({
  //       userId: 23,
  //       nickname: "Bill",
  //       email: "bill@initech.com",
  //       avatar: "https://i.imgur.com/dM7Thhn.png",
  //     });
  //     await user.save();
  //     if (user) {
  //       setUser(user);
  //       console.log(user.userId);
  //     } else {
  //       console.log("Undefined");
  //     }
  //   }
  //   run();
  const [loading, setLoading] = useState<boolean>(true);
  const [pins, setPins] = useState<Pin[]>([]);
  const [image, setImage] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/artworks")
      .then((response) => response.json())
      .then((res) => {
        setImage(res);
        console.log(res);
      });
  }, []);
  // console.log(image);

  const getImages = async () => {
    try {
      const response = await axios.get<ArtworkResponse>(
        "http://localhost:5000/artworks"
      );
      console.log("reponse: ", response);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching artwork:", error);
      throw error;
    }
  };
  const onSearchSubmit = async (term: string) => {
    setLoading(true);

    try {
      const res = await getImages();
      const newPins = Array.isArray(res.data) ? res.data : [];

      newPins.sort(() => 0.5 - Math.random());
      setPins(newPins);
    } catch (error) {
      console.error("Error fetching search images:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <Parallax ref={parallax} pages={3}>
          {/*Navigator's navbar*/}
          <ParallaxLayer
            offset={0}
            sticky={{ start: 0, end: 3 }}
            className={styles.navbar}
          >
            <Row style={{ display: "inherit" }}>
              <Navbar onSubmit={onSearchSubmit} />
            </Row>
          </ParallaxLayer>

          {/*Background*/}
          <ParallaxLayer offset={0} speed={0.3} className={styles.dusk} />
          <ParallaxLayer offset={1} speed={0.3} className={styles.day} />
          <ParallaxLayer offset={2} speed={0.3} className={styles.dawn} />

          {/*Page's main frame*/}
          <ParallaxLayer offset={0.2} speed={0.9} className={styles.sampleBox}>
            <img
              src="https://images.unsplash.com/photo-1628607292260-9195108b03b7?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className={styles.sampleImage}
            />
          </ParallaxLayer>
          <ParallaxLayer offset={1.2} speed={0.9} className={styles.sampleBox}>
            <img src={HomeImg} alt="" className={styles.sampleImage} />
          </ParallaxLayer>
          <ParallaxLayer offset={2.2} speed={0.9} className={styles.sampleBox}>
            <img src={UploadImg} alt="" className={styles.sampleImage} />
          </ParallaxLayer>
          {/* <ParallaxLayer offset={3.2} speed={0.9} className={styles.sampleBox}>
            Sample box
          </ParallaxLayer> */}

          {/*Typography and buttons*/}
          <ParallaxLayer offset={0.5} speed={1.1} className={styles.sampleTest}>
            <div className={styles.homeTextSection}>
              <h1 className={styles.primaryHeading}>
                Artwork Sharing Platform
              </h1>
              <p className={styles.primaryText}>
                Introducing our revolutionary artwork sharing platform - where
                artists and art enthusiasts come together to explore, discover,
                and share their passion for creativity.
              </p>
              <Col span={24} className={styles.sampleButton}>
                <button
                  onClick={() => parallax.current.scrollTo(1)}
                  className={styles.secondaryButton}
                >
                  Next
                </button>
                <Link to={"/"} className={styles.firstButton}>
                  <button className={styles.secondaryButton}>
                    Get start <ArrowRightOutlined />{" "}
                  </button>
                </Link>
              </Col>
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={1.5} speed={1.1} className={styles.sampleTest}>
            <div className={styles.homeTextSection}>
              <h1 className={styles.primaryHeading}>
                Do you want to visit website?
              </h1>
              <p className={styles.primaryText}>
                Welcome to the world of artistry, where imagination meets
                innovation, and expression knows no limits.
              </p>
              <Col span={24} className={styles.sampleButton}>
                <button
                  onClick={() => parallax.current.scrollTo(2)}
                  className={styles.secondaryButton}
                >
                  Next
                </button>
                <Link to={"/"} className={styles.firstButton}>
                  <button className={styles.secondaryButton}>
                    Let's Start <ArrowRightOutlined />{" "}
                  </button>
                </Link>
              </Col>
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={2.5} speed={1.1} className={styles.sampleTest}>
            <div className={styles.homeTextSection}>
              <h1 className={styles.primaryHeading}>Are you artist?</h1>
              <p className={styles.primaryText}>
                If you are a artist, you can log in and then post your artworks
                on the website. Do you want to try?
              </p>
              <Col span={24} className={styles.sampleButton}>
                <button
                  onClick={() => parallax.current.scrollTo(0)}
                  className={styles.secondaryButton}
                >
                  Go to top
                </button>
                <Link to={"/signin"} className={styles.firstButton}>
                  <button className={styles.secondaryButton}>
                    Try It <ArrowRightOutlined />{" "}
                  </button>
                </Link>
              </Col>
            </div>
          </ParallaxLayer>

          {/*Navigate*/}
        </Parallax>
      </div>
    </>
  );
}
