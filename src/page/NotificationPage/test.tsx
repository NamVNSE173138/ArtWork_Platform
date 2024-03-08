import React, { useEffect, useState, ReactNode } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
import { Tabs, TabsTrigger, TabsList } from "@radix-ui/react-tabs";
import { DeleteOutlined } from "@ant-design/icons";
import {
  getAllNotification,
  markNotificationAsRead,
} from "../../api/notificate/notifcationAPI";

interface NotificationProps {
  _id: string;
  user: {
    userId: string;
    nickname: string;
  };
  artist: string;
  artwork: {
    artworkId: string;
    name: string;
  };
  type: string;
  status: boolean;
}

function SkeletonNotifications() {
  return (
    <Card>
      <div className="p-6 pb-4">
        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-2.5"></div>
        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-2.5"></div>
        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-2.5"></div>
      </div>
    </Card>
  );
}

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [filter, setFilter] = useState<"Like" | "Buy" | "Hired">("Like");
  const filteredNotifications = notifications.filter(
    (notification) => notification.type === filter
  );

  const navigate = useNavigate();

  useEffect(() => {
    getAllNotification().then((res) => {
      setNotifications(res);
    });
  }, []);

  console.log("NOTIFY: ", notifications);

  function Notification({
    notification,
    title,
    description,
    icon,
  }: {
    // notification: (typeof api.notification.getNotifications._returnType)[0];
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
          {/* <div className="mb-2">{timeFrom(notification._creationTime)}</div> */}
          <div>
            <Link to={`/profile/${notification.user.userId}`}>
              {notification.user.nickname}{" "}
            </Link>
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
              console.log("IDDD: ", notification.artwork.artworkId);
            }
            // router.push(`/thumbnails/${notification.thumbnailId}`);
            navigate(`/artwork/${notification.artwork.name}`);
          }}
        >
          {notification.status ? "View" : "Read"}
        </Button>
      </div>
    );
  }

  return (
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
            <TabsTrigger value="Hired" className="flex gap-2">
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
      </div>
    </div>
  );
};

export default Notification;
