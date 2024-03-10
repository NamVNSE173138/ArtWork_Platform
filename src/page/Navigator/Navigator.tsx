import { useRef } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { Image, Typography, FloatButton } from "antd";
import HomeImg from "../../assets/image/Home.png";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/image/logo.jpg";

export default function Navigator() {
  const navigate = useNavigate()
  const { Text } = Typography
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

  const scroll = (to: number) => {
    if (parallax.current) {
      parallax.current.scrollTo(to)
    }
  }

  return (
    <div>
      <Parallax ref={parallax} pages={2} className={styles.container}>
        <ParallaxLayer
          offset={0}
          sticky={{ start: 0, end: 2 }}
          className={styles.navbar}
        >
          <span style={{ marginLeft: "1%" }}>
            <Text strong className={styles.primaryHeading}>
              ART FROM THE SOUL, ART FOR THE SOUL
            </Text>
          </span>
          <span className={styles.navbarLogo}>
            <img src={Logo} alt="art" onClick={() => { window.location.reload() }} />
          </span>
          <span className={styles.buttonGroup}>
            <button
              onClick={() => { navigate('/signin') }}
              className={styles.navbarButton}>
              SIGN IN
            </button>
            <button
              onClick={() => { navigate('/signup/email') }}
              className={styles.navbarButton}
            >
              CREATE A FREE ACCOUNT
            </button>
          </span>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.3} className={styles.top} />
        <ParallaxLayer offset={1} speed={0.3} className={styles.bottom} />

        <ParallaxLayer offset={0} speed={2.5} className={styles.topTextSection}>
          <span className={styles.branding}>
            <Text strong className={styles.primaryHeading}>
              ARTWORK SHARING PLATFORM
            </Text>
            <Text className={styles.primaryText}>
              one of the best places to enjoy the work of art
            </Text>
          </span>

          <button
            onClick={() => { navigate('/home') }}
            className={styles.primaryButton}>
            DISCOVER
            <ArrowRightOutlined style={{ fontSize: '75%', display: 'inline', marginLeft: '10%' }} />
          </button>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={2} className={styles.splitSection}>
          <div className={styles.halfSection} id={styles.artist}>
            <span className={styles.decorativeSection}>
              <Image src="https://www.suzinassif.com/wp-content/uploads/2020/12/PARADOX.jpg" width={200} preview={false} alt="" />
            </span>

            <span className={styles.infoSection}>
              <span>
                <Text strong className={styles.primaryHeading}>
                  BECOME AN ARTIST
                </Text>
                <p className={styles.primaryText} style={{ color: 'white' }}>
                  Share your dedicated artworks to everyone and live an artist's life.
                </p>
              </span>
              <button onClick={() => navigate('/upload')} className={styles.primaryButton}>
                START
                <ArrowRightOutlined style={{ fontSize: '75%', display: 'inline', marginLeft: '10%' }} />
              </button>
            </span>
          </div>

          <div className={styles.halfSection} id={styles.own}>
            <span className={styles.decorativeSection}>
              <Image src={HomeImg} width={220} height={220} preview={false} alt="" />
            </span>

            <span className={styles.infoSection}>
              <span>
                <Text strong className={styles.primaryHeading} style={{ fontSize: '350%' }}>
                  VISUALIZE YOUR ART
                </Text>
                <p className={styles.primaryText}>
                  Thousands of artists are ready to make your dream come true.
                </p>
              </span>
              <button className={styles.primaryButton} onClick={() => { navigate('/request') }}>
                START
                <ArrowRightOutlined style={{ fontSize: '75%', display: 'inline', marginLeft: '10%' }} />
              </button>
            </span>
            <span>

            </span>
          </div>
        </ParallaxLayer>
      </Parallax>

      <FloatButton.BackTop style={{ marginRight: "2%" }} onClick={() => { scroll(0) }} />
    </div>
  );
}
