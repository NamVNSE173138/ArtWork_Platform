import React, { useEffect, useState } from "react";
import { getAllNotification } from "../../api/notificate/notifcationAPI";

interface NotificationProps {
  _id: string;
  user: string;
  artist: string;
  artwork: string;
  type: string;
  status: string;
}

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  useEffect(() => {
    getAllNotification().then((res) => {
      setNotifications(res);
    });
  });

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>
            <p>
              {notification.user} {notification.type}d your post.
            </p>
            <p>Post ID: {notification.artwork}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
