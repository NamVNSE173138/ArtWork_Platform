import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Card } from "antd";
import axios from "axios";
import {
  deleteNotification,
  markNotificationAsRead,
} from "../../api/notificate/notifcationAPI";
import Navbar from "../../components/Navbar/Navbar";
import moment from "moment";

interface User {
  id: string;
  email: string;
  nickname: string;
  role: string;
  numOfFollower: number;
  avatar: string;
  password: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface NotificationProps {
  _id: string;
  user: {
    _id: string;
    nickname: string;
    avatar: string;
  };
  artist: string;
  artwork: {
    _id: string;
    name: string;
  };
  type: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

function SkeletonNotifications() {
  return (
    <Card>
      <div className="p-6 pb-4">
        <div className="h-4 bg-gray-200 rounded mb-2.5"></div>
        <div className="h-4 bg-gray-200 rounded mb-2.5"></div>
        <div className="h-4 bg-gray-200 rounded mb-2.5"></div>
      </div>
    </Card>
  );
}

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
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
    createdAt: "",
    updatedAt: "",
  });

  const getNotificationList = async (id: any) => {
    setIsLoading(true);
    if (currentUser.id) {
      await axios
        .get(`http://localhost:5000/notifications/${id}`, {
          headers: {
            token: userToken,
          },
        })
        .then((res: any) => {
          setNotifications(res.data);
          setIsLoading(false);
        })
        .catch((err: any) => console.log(err));
    }
  };

  const fetchCurrentUserData = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:5000/users/getUserInfo`, {
        headers: {
          token: userToken,
        },
      })
      .then((res: any) => {
        setCurrentUser(res.data);
        setIsLoading(false);
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCurrentUserData();
      await getNotificationList(currentUser.id);
    };
    fetchData();
  }, [currentUser.id]);

  const handleNothing = () => {};

  function Notification({
    notification,
    description,
  }: {
    notification: NotificationProps;
    description: string;
  }) {
    const navigateToArtwork = () => {
      navigate(`/artwork/${notification.artwork?._id}`);
    };

    const navigateRequest = () => {
      navigate("/profile/requests");
    };

    const navigateDecline = () => {
      navigate(`/artistList/${notification.user._id}`);
    };

    let onClickAction: any;

    switch (notification.type) {
      case "Like":
        onClickAction = navigateToArtwork;
        break;
      case "Request":
        onClickAction = navigateRequest;
        break;
      case "Decline":
        onClickAction = navigateDecline;
        break;
      default:
        onClickAction = () => {}; // Default action if type is unknown
        break;
    }
    return (
      <div
        className="flex items-center gap-4 border p-4 rounded"
        style={{
          width: "1000px",
          margin: "10px 0px 0px 250px",
          backgroundColor: notification.status ? "white" : "#f0f0f0",
        }}
        key={notification._id}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar size={50} src={notification.user.avatar} />
            <div style={{ marginLeft: "10px", marginTop: "-20px" }}>
              <span style={{ fontWeight: "bold" }}>
                {notification.user.nickname}
              </span>
              {description}
            </div>
          </div>
          <div style={{ margin: "-25px 0px 10px 60px", fontSize: "12px" }}>
            {moment(notification.createdAt).fromNow()}
          </div>
        </div>

        <Button
          style={{ marginTop: "10px" }}
          title={notification.status ? "outline" : "default"}
          className="ml-auto"
          onClick={() => {
            if (notification.status === false) {
              markNotificationAsRead(notification._id);
            } else {
              console.log("DAD: ", notification._id);
            }
            // navigate(`/artwork/${notification.artwork?._id}`);
            onClickAction();
          }}
        >
          {notification.status ? "View" : "Read"}
        </Button>
        <Button
          style={{ margin: "10px 0px 0px 10px" }}
          onClick={() => deleteNotification(notification._id)}
        >
          Delete
        </Button>
      </div>
    );
  }

  return (
    <>
      <Navbar onSubmit={handleNothing} />
      <div className="notification-container">
        <h1 className="text-center text-4xl font-bold mb-12">Notifications</h1>
        <div className="flex flex-col gap-8 max-w-xl mx-auto">
          {notifications
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((notification: any) => {
              let description = "";

              switch (notification.type) {
                case "Like":
                  description = " liked your post!";
                  break;
                case "Buy":
                  description = " want to buy your artwork.";
                  break;
                case "Request":
                  description = " want to hire you.";
                  break;
                case "Decline":
                  description = " has declined your request.";
                  break;
                default:
                  break;
              }

              return (
                <Notification
                  key={notification._id}
                  description={description}
                  notification={notification}
                />
              );
            })}

          {notifications === undefined && (
            <div className="animate-pulse flex flex-col gap-8">
              <SkeletonNotifications />
              <SkeletonNotifications />
              <SkeletonNotifications />
            </div>
          )}

          {notifications && notifications.length === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img
                style={{
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  padding: "48px",
                }}
                src="https://raw.githubusercontent.com/webdevcody/thumbnail-critique/22e8204eab91855ea5069e876b294ba5d2706200/public/void.svg"
                alt="no found icon"
                width={400}
              />
              <div style={{ fontSize: "2rem" }}>You have no notifications</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
