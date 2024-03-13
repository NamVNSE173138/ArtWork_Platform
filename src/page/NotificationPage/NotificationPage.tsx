import { useEffect, useState, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Image, notification } from "antd";
import axios from "axios";
import { Tabs, TabsTrigger, TabsList } from "@radix-ui/react-tabs";
import { DeleteOutlined } from "@ant-design/icons";
import { markNotificationAsRead } from "../../api/notificate/notifcationAPI";
import Navbar from "../../components/Navbar/Navbar";

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
    userId: string;
    nickname: string;
  };
  artist: string;
  artwork: {
    _id: string;
    name: string;
  };
  type: string;
  status: boolean;
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
  const [filter, setFilter] = useState<"Like" | "Buy" | "Request">("Like");
  const filteredNotifications = notifications.filter(
    (notification) => notification.type === filter
  );
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

  console.log("NOTIFY: ", currentUser);

  const handleNothing = () => {};

  function Notification({
    notification,
    title,
    description,
    icon,
  }: {
    notification: NotificationProps;
    title: string;
    description: string;
    icon: ReactNode;
  }) {
    return (
      <div
        className="flex items-center gap-4 border p-4 rounded"
        key={notification._id}
      >
        {icon}

        <div>
          <div className="font-bold mb-2">{title}</div>
          <div>
            {/* <Link to={`/profile/${notification.user.userId}`}> */}
            {notification.user.nickname}
            {/* </Link> */}
            {description}
          </div>
        </div>

        <Button
          title={notification.status ? "outline" : "default"}
          className="ml-auto"
          onClick={() => {
            if (!notification.status) {
              markNotificationAsRead(notification._id);
            } else {
              console.log("DAD: ", notification);
              // console.log("IDDD: ", notification.user);
            }
            navigate(`/artwork/${notification.artwork?._id}`);
          }}
        >
          {notification.status ? "View" : "Read"}
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
          <Tabs
            defaultValue="votes"
            className="mx-auto"
            onValueChange={(value: any) => {
              setFilter(value);
            }}
          >
            <TabsList>
              <TabsTrigger value="Like" className="flex gap-2">
                Likes
              </TabsTrigger>
              <TabsTrigger value="Buy" className="flex gap-2">
                Buy
              </TabsTrigger>
              <TabsTrigger value="Request" className="flex gap-2">
                Request
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {filteredNotifications?.map((notification: any) => {
            if (notification.type === "Like") {
              return (
                <Notification
                  key={notification._id}
                  description=" liked your post!"
                  icon={<DeleteOutlined className="h-14 w-14" />}
                  title="New Liked!!!"
                  notification={notification}
                />
              );
            } else if (notification.type === "Buy") {
              return (
                <Notification
                  key={notification._id}
                  description=" want to buy your artwork."
                  icon={<DeleteOutlined className="h-14 w-14" />}
                  title="New Money!!!"
                  notification={notification}
                />
              );
            } else {
              return (
                <Notification
                  key={notification._id}
                  description=" want to hire you."
                  icon={<DeleteOutlined className="h-14 w-14" />}
                  title="New Request!!!"
                  notification={notification}
                />
              );
            }
          })}

          {notifications === undefined && (
            <div className="animate-pulse flex flex-col gap-8">
              <SkeletonNotifications />
              <SkeletonNotifications />
              <SkeletonNotifications />
            </div>
          )}

          {filteredNotifications && filteredNotifications.length === 0 && (
            <div className="flex flex-col items-center gap-8">
              <Image
                className="rounded-lg bg-white p-12"
                src="https://raw.githubusercontent.com/webdevcody/thumbnail-critique/22e8204eab91855ea5069e876b294ba5d2706200/public/void.svg"
                alt="no found icon"
                width={400}
              />
              <div className="text-2xl font-bold">
                You have no notifications
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
