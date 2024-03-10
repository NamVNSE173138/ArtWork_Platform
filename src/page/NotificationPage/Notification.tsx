// import { useMutation, useQuery } from "convex/react";
import { api } from "./api";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { useSession } from "@/lib/utils";
// import Link from "next/link";
// import {
//   MessageSquareIcon,
//   PictureInPictureIcon,
//   SpeechIcon,
//   VoteIcon,
// } from "lucide-react";
import { ReactNode, useState } from "react";
// import { timeFrom } from "@/util/time-from";
// import { useRouter } from "next/navigation";
import { Tabs } from "antd";
// import { Card } from "@/components/ui/card";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

interface Notification {
  user: string;
  artist: string;
  artwork: string;
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

function Notification({
  notification,
  title,
  description,
  icon,
}: {
  notification: (typeof api.notification.getNotifications._returnType)[0];
  title: string;
  description: string;
  icon: ReactNode;
}) {
  // const markAsRead = useMutation(api.notification.markAsRead);
  // const router = useRouter();

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
          <Link to={`/profile/${notification.from}`}>
            {notification.profile.name}{" "}
          </Link>
          {description}
        </div>
      </div>

      <Button
        // variant={notification.isRead ? "outline" : "default"}
        className="ml-auto"
        // onClick={async () => {
        //   if (!notification.isRead) {
        //     markAsRead({
        //       notificationId: notification._id,
        //     });
        //   }
        //   router.push(`/thumbnails/${notification.thumbnailId}`);
        // }}
      >
        {notification.isRead ? "View" : "Read"}
      </Button>
    </div>
  );
}

export default function NotificationsPage() {
  // const { isAuthenticated } = useSession();

  const [filter, setFilter] = useState<"vote" | "thumbnail" | "comment">(
    "vote"
  );

  const notifications = useState();
  // api.notification.getNotifications,
  // !isAuthenticated ? "skip" : undefined

  // const filteredNotifications = notifications?.filter(
  //   (notification) => notification.type === filter
  // );

  const [filteredNotifications, useR] = useState([]);

  return (
    <div className="">
      <h1 className="text-center text-4xl font-bold mb-12">Notifications</h1>

      <div className="flex flex-col gap-8 max-w-xl mx-auto">
        <Tabs
          defaultValue="votes"
          className="mx-auto"
          // onValueChange={(value: any) => {
          //   setFilter(value);
          // }}
        >
          {/* <TabsList>
            <TabsTrigger value="vote" className="flex gap-2">
              <VoteIcon /> Votes
            </TabsTrigger>
            <TabsTrigger value="thumbnail" className="flex gap-2">
              <PictureInPictureIcon /> Thumbnails
            </TabsTrigger>
            <TabsTrigger value="comment" className="flex gap-2">
              <MessageSquareIcon /> Comments
            </TabsTrigger>
          </TabsList> */}
        </Tabs>

        {filteredNotifications?.map((notification: any) => {
          if (notification.type === "thumbnail") {
            return (
              <Notification
                key={notification._id}
                description=" uploaded a new thumbnail test!"
                icon={<DeleteOutlined className="h-14 w-14" />}
                title="New Thumbnail"
                notification={notification}
              />
            );
          } else if (notification.type === "comment") {
            return (
              <Notification
                key={notification._id}
                description=" left a comment on your thumbnail."
                icon={<DeleteOutlined className="h-14 w-14" />}
                title="New Comment"
                notification={notification}
              />
            );
          } else {
            return (
              <Notification
                key={notification._id}
                description=" voted for one of your thumbnail images."
                icon={<DeleteOutlined className="h-14 w-14" />}
                title="New Vote"
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

        {/* {filteredNotifications && filteredNotifications.length === 0 && (
          <div className="flex flex-col items-center gap-8">
            <Image
              className="rounded-lg bg-white p-12"
              src="/void.svg"
              alt="no found icon"
              width="400"
              height="400"
            />
            <div className="text-2xl font-bold">You have no notifications</div>
          </div>
        )} */}
      </div>
    </div>
  );
}
