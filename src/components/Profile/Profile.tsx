// ProfilePage.tsx
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Button,
  Tabs,
  Modal,
  Form,
  Input,
  message,
  Badge,
  Typography,
} from "antd";
import {
  EditOutlined,
  CameraOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";
import "./Profile.css"; // Create this stylesheet for additional styling if needed
import Contributed from "../ContributedArtwork/ContributedArtwork";
import Favorite from "../Favorite/Favorite";
import { useParams } from "react-router-dom";
import axios from 'axios';
const { Meta } = Card;
const { Text } = Typography;

interface User {
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
interface FavoriteList {
  user?: {
    id: string;
    nickname: string;
    avatar: string;
  };
  artwork?: {
    _id: string;
    name: string;
    tags: string[];
    imageUrl: string;
    numOfLike: number;
    price: number;
    description: string;
    status: boolean;
  };
  createAt?: string;
  updateAt?: string;
}


const ProfilePage: React.FC = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { id } = useParams();
  console.log(id);
  const [favoriteList, setFavoriteList] = useState<FavoriteList[]>([]);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <Badge count={100} overflowCount={99} offset={[15, 0]} showZero>
          <Text>Favorited</Text>
        </Badge>
      ),
      children: <Favorite />,
    },
    {
      key: "2",
      label: (
        <Badge count={1} overflowCount={999} offset={[15, 0]} showZero>
          <Text>Contributed</Text>
        </Badge>
      ),
      children: <Contributed />,
    },
  ];

  const showEditModal = () => {
    setEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditModalOk = () => {
    // Handle logic for saving edited profile data
    setEditModalVisible(false);
  };
  const userToken = localStorage.getItem("USER");

  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    email: "",
    password: "",
    nickname: "",
    role: "",
    numOfFollower: 0,
    avatar: "",
    status: false,
    createAt: "",
    updateAt: "",
  });
  const fetchCurrentUserData = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:5000/users/getUserInfo`, {
        headers: {
          token: userToken, //userToken = localStorage("USER")
        },
      })
      .then((res) => {
        console.log("Current user: ", res.data);
        setCurrentUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchCurrentUserData();
  }, []);
  useEffect(() => {
    console.log("Current user: ", currentUser);
  }, [currentUser]);

  const handleShareProfile = () => {
    // Copy URL to clipboard
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        message.success("Profile link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
        message.error("Failed to copy profile link!");
      });
  };
  return (
    <div className="profile-container">
      <Row gutter={16}>
        <Col span={24}>
          <div className="profile-content">
            <Card
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Meta
                avatar={<Avatar src={currentUser.avatar} />}
                title={currentUser.nickname}
                description={
                  <>
                    {currentUser.email} <br />
                    <i>Role: {currentUser.role}</i>
                  </>
                }
              />

              {[
                <Button
                  size="large"
                  className="profile-btn"
                  icon={<ShareAltOutlined />}
                  key="upload"
                  onClick={handleShareProfile}
                >
                  Share Profile
                </Button>,
                <Button
                  size="large"
                  className="profile-btn"
                  icon={<EditOutlined />}
                  key="edit"
                  onClick={showEditModal}
                >
                  Edit Profile
                </Button>,
              ]}
            </Card>

            <Modal
              title="Edit Profile"
              open={editModalVisible}
              onOk={handleEditModalOk}
              onCancel={handleEditModalCancel}
            >
              {/* Add your form fields for editing profile data */}
              <Form layout="vertical">
                <Form.Item label="Full Name">
                  <Input placeholder="Enter your full name" />
                </Form.Item>
                <Form.Item label="Bio">
                  <Input.TextArea placeholder="Enter your bio" />
                </Form.Item>
                {/* Add more form fields as needed */}
              </Form>
            </Modal>
          </div>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Tabs
            defaultActiveKey="1"
            items={items}
            size="large"
            type="card"
            tabBarGutter={20}
            centered
          />
        </Col>
      </Row>
      <Favorite />
    </div>
  );
};

export default ProfilePage;










// import React, { useEffect, useState } from "react";
// import {
//   Row,
//   Col,
//   Card,
//   Avatar,
//   Button,
//   Tabs,
//   Modal,
//   Form,
//   Input,
//   message,
//   Badge,
//   Typography,
// } from "antd";
// import {
//   EditOutlined,
//   CameraOutlined,
//   ShareAltOutlined,
// } from "@ant-design/icons";
// import type { TabsProps } from "antd";
// import "./Profile.css"; // Create this stylesheet for additional styling if needed
// import Contributed from "../ContributedArtwork/ContributedArtwork";
// import Favorite from "../Favorite/Favorite";
// import { useParams } from "react-router-dom";
// import axios from 'axios';
// const { Meta } = Card;
// const { Text } = Typography;
// interface FavoriteList {
//   user?: {
//     id: string;
//     nickname: string;
//     avatar: string;
//   };
//   artwork?: {
//     _id: string;
//     name: string;
//     tags: string[];
//     imageUrl: string;
//     numOfLike: number;
//     price: number;
//     description: string;
//     status: boolean;
//   };
//   createAt?: string;
//   updateAt?: string;
// }
// // const [favoriteListData, setFavoriteListData] = useState<FavoriteList[]>([]);

// interface User {
//   id: string;
//   email: string;
//   nickname: string;
//   role: string;
//   numOfFollower: number;
//   avatar: string;
//   password: string;
//   status: boolean;
//   createAt?: string;
//   updateAt?: string;
// }

// interface Artwork {
//   _id: string;
//   user: User;
//   name: string;
//   tags: [string];
//   numOfLike: number;
//   price: number;
//   description: string;
//   imageUrl: string;
//   status: boolean;
//   createAt?: string;
//   updateAt?: string;
// }

// interface FavoriteList {

//   createAt?: string;
//   updateAt?: string;
// }
// const ProfilePage: React.FC = () => {
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [favoriteList, setFavoriteList] = useState<FavoriteList[]>([]);
//   const { id } = useParams();
//   console.log(id);
//   const items: TabsProps["items"] = [
//     {
//       key: "1",
//       label: (
//         <Badge count={100} overflowCount={99} offset={[15, 0]} showZero>
//           <Text>Favorited</Text>
//         </Badge>
//       ),
//       children: <Favorite favoriteList={favoriteList} />,
//     },
//     {
//       key: "2",
//       label: (
//         <Badge count={1} overflowCount={999} offset={[15, 0]} showZero>
//           <Text>Contributed</Text>
//         </Badge>
//       ),
//       children: <Contributed />,
//     },
//   ];

//   const showEditModal = () => {
//     setEditModalVisible(true);
//   };

//   const handleEditModalCancel = () => {
//     setEditModalVisible(false);
//   };

//   const handleEditModalOk = () => {
//     // Handle logic for saving edited profile data
//     setEditModalVisible(false);
//   };
//   const userToken = localStorage.getItem("USER");

//   const [isLoading, setIsLoading] = useState(false);
//   const [currentUser, setCurrentUser] = useState<User>({
//     id: "",
//     email: "",
//     password: "",
//     nickname: "",
//     role: "",
//     numOfFollower: 0,
//     avatar: "",
//     status: false,
//     createAt: "",
//     updateAt: "",
//   });

//   // Define favoriteList state


//   const fetchCurrentUserData = async () => {
//     setIsLoading(true);
//     await axios
//       .get(`http://localhost:5000/users/getUserInfo`, {
//         headers: {
//           token: userToken, //userToken = localStorage("USER")
//         },
//       })
//       .then((res) => {
//         console.log("Current user: ", res.data);
//         setCurrentUser(res.data);
//         setIsLoading(false);
//         // Set favoriteList state here
//         setFavoriteList(res.data.favoriteList);
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     fetchCurrentUserData();
//   }, []);

//   useEffect(() => {
//     console.log("Current user: ", currentUser);
//   }, [currentUser]);

//   const handleShareProfile = () => {
//     // Copy URL to clipboard
//     const url = window.location.href;
//     navigator.clipboard
//       .writeText(url)
//       .then(() => {
//         message.success("Profile link copied to clipboard!");
//       })
//       .catch((error) => {
//         console.error("Failed to copy:", error);
//         message.error("Failed to copy profile link!");
//       });
//   };
//   return (
//     <div className="profile-container">
//       <Row gutter={16}>
//         <Col span={24}>
//           <div className="profile-content">
//             <Card
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Meta
//                 avatar={<Avatar src={currentUser.avatar} />}
//                 title={currentUser.nickname}
//                 description={
//                   <>
//                     {currentUser.email} <br />
//                     <i>Role: {currentUser.role}</i>
//                   </>
//                 }
//               />

//               {[
//                 <Button
//                   size="large"
//                   className="profile-btn"
//                   icon={<ShareAltOutlined />}
//                   key="upload"
//                   onClick={handleShareProfile}
//                 >
//                   Share Profile
//                 </Button>,
//                 <Button
//                   size="large"
//                   className="profile-btn"
//                   icon={<EditOutlined />}
//                   key="edit"
//                   onClick={showEditModal}
//                 >
//                   Edit Profile
//                 </Button>,
//               ]}
//             </Card>

//             <Modal
//               title="Edit Profile"
//               open={editModalVisible}
//               onOk={handleEditModalOk}
//               onCancel={handleEditModalCancel}
//             >
//               {/* Add your form fields for editing profile data */}
//               <Form layout="vertical">
//                 <Form.Item label="Full Name">
//                   <Input placeholder="Enter your full name" />
//                 </Form.Item>
//                 <Form.Item label="Bio">
//                   <Input.TextArea placeholder="Enter your bio" />
//                 </Form.Item>
//                 {/* Add more form fields as needed */}
//               </Form>
//             </Modal>
//           </div>
//         </Col>
//       </Row>
//       <Row gutter={16} style={{ marginTop: 20 }}>
//         <Col span={24}>
//           <Tabs
//             defaultActiveKey="1"
//             items={items}
//             size="large"
//             type="card"
//             tabBarGutter={20}
//             centered
//           />
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default ProfilePage;
