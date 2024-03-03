import React, { useEffect, useState } from "react";
import {
    Flex,
    Spin,
    Alert,
    Button,
    message,
    Tag,
    Modal,
    Space,
} from "antd";
import {
    CalendarOutlined,
    DownloadOutlined,
    HeartFilled,
    PlusOutlined,
    SafetyOutlined,
} from "@ant-design/icons";
import "./Favorite.css";
interface ImageData {
    id: string;
}

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
interface Artwork {
    _id: string;
    user: string;
    name: string;
    tags: [string];
    numOfLike: number;
    price: number;
    description: string;
    imageUrl: string;
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
interface FavoriteProps {
    favoriteList: FavoriteList[]; // Define the type of the favoriteList prop
}

const tags = [
    "Sossusvlei",
    "Namibia",
    "Tree Images & Pictures",
    "Desert Images",
    "Dawn",
    "Ground",
    "Hd Scenery Wallpapers",
    "Outdoors",
    "Nature Images",
    "Hd Grey Wallpapers",
    "Human",
    "People Images & Pictures",
    "Free Stock Photos",
];

const handleAction = (action: string) => {
    switch (action) {
        case "Like":
            message.success("Favorited !");
            // Implement your like functionality here
            break;
        case "Add":
            message.success("You added the image !");
            // Implement your add functionality here
            break;
        case "Download":
            message.success("Downloading image...");
            // Implement your download functionality here
            break;
        default:
            message.warning("Unknown action");
    }
};

const Favorite: React.FC<FavoriteProps> = ({ favoriteList }) => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        const generateImageObjects = () => {
            const imageObjects: ImageData[] = Array.from(
                { length: 10 },
                (_, index) => ({
                    id: `image-${index + 1}`,
                })
            );
            setImages(imageObjects);
            setLoading(false);
        };

        generateImageObjects();
    }, []);

    const showModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    if (loading) {
        return <Spin />;
    }

    if (error) {
        return <Alert message="Error fetching images" type="error" />;
    }

    return (
        // <div className="mainboard_wrapper">
        //     <div className="mainboard_container">
        //         {images.map((image, index) => (
        //             <div key={image.id} className="image">
        //                 {/* Wrap all elements related to each image inside a parent container */}
        //                 <div className="top-btn">
        //                     <Button
        //                         size="large"
        //                         className="like-btn"
        //                         icon={<HeartFilled />}
        //                         onClick={() => handleAction("Like")}
        //                     />
        //                     <Button
        //                         size="large"
        //                         className="add-btn"
        //                         icon={<PlusOutlined />}
        //                         onClick={() => handleAction("Add")}
        //                     />
        //                 </div>
        //                 <div className="bottom-btn">
        //                     <Button
        //                         size="large"
        //                         className="download-btn"
        //                         icon={<DownloadOutlined />}
        //                         onClick={() => handleAction("Download")}
        //                     />
        //                 </div>
        //                 <div className="artist-info">
        //                     <img
        //                         src={
        //                             "https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/374852207_3473181502955513_5066250399042915797_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeFK-YCTXTmYEZbuyizFU-9hMR_6p8bWSwExH_qnxtZLATUF4CJxoBYDUFxEiZ8BW7Su3Ot6k7vphoBITf1qMnsH&_nc_ohc=HdV6eApcuiEAX8vm2Gu&_nc_ht=scontent.fsgn16-1.fna&oh=00_AfA9ZIrDGIYoFRu2f1D-P8s-dTaNXGKvegN0I2RbdUsGkw&oe=65A7032A"
        //                         }
        //                         alt="artist avatar"
        //                         className="avatar"
        //                     />
        //                     <div className="info">
        //                         <p className="name">Cun</p>
        //                         <p className="tag">#nice</p>
        //                     </div>
        //                 </div>
        //                 <img
        //                     src={`https://i.pinimg.com/564x/8c/4a/51/8c4a51e005629a084505649079b0a949.jpg`}
        //                     alt=""
        //                     style={{
        //                         width: "100%",
        //                         height: "100%",
        //                         objectFit: "cover",
        //                         marginBottom: "10px",
        //                         marginRight: "10px",
        //                     }}
        //                     onClick={showModal}
        //                 />
        //             </div>
        //         ))}
        //     </div>
        //     <Modal
        //         style={{ top: 20 }}
        //         open={modalVisible}
        //         onCancel={() => setModalVisible(false)}
        //         footer={null}
        //         width={1233}
        //         centered
        //     >
        //         <div className="modal-content">
        //             <div className="top-modal">
        //                 <div className="artist-info-modal">
        //                     <img
        //                         src={
        //                             "https://images.unsplash.com/photo-1682686579688-c2ba945eda0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D"
        //                         }
        //                         alt="artist avatar"
        //                         className="avatar"
        //                     />
        //                     <div className="info">
        //                         <p className="name">Cun</p>
        //                         <p className="tag">#kk</p>
        //                     </div>
        //                 </div>
        //                 <div className="modal-btns">
        //                     <Button
        //                         size="large"
        //                         className="like-modal-btn"
        //                         icon={<HeartFilled />}
        //                         onClick={() => handleAction("Like")}
        //                     />
        //                     <Button
        //                         size="large"
        //                         className="add-modal-btn"
        //                         icon={<PlusOutlined />}
        //                         onClick={() => handleAction("Add")}
        //                     />

        //                     <Button
        //                         size="large"
        //                         className="download-modal-btn"
        //                         icon={<DownloadOutlined />}
        //                         onClick={() => handleAction("Download")}
        //                     >
        //                         {" "}
        //                         Download
        //                     </Button>
        //                 </div>
        //             </div>
        //             <div className="image-container">
        //                 <img
        //                     className="img-modal"
        //                     src={
        //                         "https://i.pinimg.com/564x/8c/4a/51/8c4a51e005629a084505649079b0a949.jpg"
        //                     }
        //                     alt=""
        //                 />
        //             </div>
        //             <div className="bottom-section">
        //                 <div className="download-count">
        //                     Downloads
        //                     <br /> <span>5,432</span>
        //                 </div>
        //                 <div className="actions">
        //                     <Button
        //                         className="share-btn"
        //                         size="large"
        //                     // onClick={handleShare}
        //                     >
        //                         Share
        //                     </Button>
        //                     <Button
        //                         className="report-btn"
        //                         size="large"
        //                     // onClick={handleReport}
        //                     >
        //                         Report
        //                     </Button>
        //                 </div>
        //             </div>
        //             <div className="img-detail">
        //                 <span>
        //                     <CalendarOutlined /> Pushlished 12 days ago
        //                 </span>
        //                 <br />
        //                 <span>
        //                     <SafetyOutlined /> Free to use under the ArtAttack License
        //                 </span>
        //             </div>
        //             <Space size={[0, 8]} wrap>
        //                 {tags.map((tag, index) => (
        //                     <Tag key={index}>{tag}</Tag>
        //                 ))}
        //             </Space>
        //         </div>
        //     </Modal>
        // </div>
        <div className="mainboard_wrapper">
            <div className="mainboard_container">
                {favoriteList.map((favorite, index) => (
                    <div key={index} className="image">
                        {/* Wrap all elements related to each image inside a parent container */}
                        <div className="top-btn">
                            <Button
                                size="large"
                                className="like-btn"
                                icon={<HeartFilled />}
                                onClick={() => handleAction("Like")}
                            />
                            <Button
                                size="large"
                                className="add-btn"
                                icon={<PlusOutlined />}
                                onClick={() => handleAction("Add")}
                            />
                        </div>
                        <div className="bottom-btn">
                            <Button
                                size="large"
                                className="download-btn"
                                icon={<DownloadOutlined />}
                                onClick={() => handleAction("Download")}
                            />
                        </div>
                        <div className="artist-info">
                            <img
                                src={favorite.user?.avatar}
                                alt="artist avatar"
                                className="avatar"
                            />
                            <div className="info">
                                <p className="name">{favorite.user?.nickname}</p>
                                <p className="tag">#{favorite.artwork?.name}</p>
                            </div>
                        </div>
                        <img
                            src={favorite.artwork?.imageUrl}
                            alt=""
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                marginBottom: "10px",
                                marginRight: "10px",
                            }}
                            onClick={showModal}
                        />
                    </div>
                ))}
            </div>
            <Modal
                style={{ top: 20 }}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={1233}
                centered
            >
                {/* Modal Content */}
            </Modal>
        </div>
    );
};

export default Favorite;










// import React, { useEffect, useState } from "react";
// import {
//     Flex,
//     Spin,
//     Alert,
//     Button,
//     message,
//     Tag,
//     Modal,
//     Space,
// } from "antd";
// import {
//     CalendarOutlined,
//     DownloadOutlined,
//     HeartFilled,
//     PlusOutlined,
//     SafetyOutlined,
// } from "@ant-design/icons";
// import "./Favorite.css";
// interface ImageData {
//     id: string;
// }

// const tags = [
//     "Sossusvlei",
//     "Namibia",
//     "Tree Images & Pictures",
//     "Desert Images",
//     "Dawn",
//     "Ground",
//     "Hd Scenery Wallpapers",
//     "Outdoors",
//     "Nature Images",
//     "Hd Grey Wallpapers",
//     "Human",
//     "People Images & Pictures",
//     "Free Stock Photos",
// ];

// const handleAction = (action: string) => {
//     switch (action) {
//         case "Like":
//             message.success("Favorited !");
//             // Implement your like functionality here
//             break;
//         case "Add":
//             message.success("You added the image !");
//             // Implement your add functionality here
//             break;
//         case "Download":
//             message.success("Downloading image...");
//             // Implement your download functionality here
//             break;
//         default:
//             message.warning("Unknown action");
//     }
// };

// const Favorite: React.FC = () => {
//     const [images, setImages] = useState<ImageData[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [modalVisible, setModalVisible] = useState<boolean>(false);

//     useEffect(() => {
//         const generateImageObjects = () => {
//             const imageObjects: ImageData[] = Array.from(
//                 { length: 10 },
//                 (_, index) => ({
//                     id: `image-${index + 1}`,
//                 })
//             );
//             setImages(imageObjects);
//             setLoading(false);
//         };

//         generateImageObjects();
//     }, []);

//     const showModal = () => {
//         setModalVisible(true);
//     };

//     const closeModal = () => {
//         setModalVisible(false);
//     };

//     if (loading) {
//         return <Spin />;
//     }

//     if (error) {
//         return <Alert message="Error fetching images" type="error" />;
//     }

//     return (
//         <div className="mainboard_wrapper">
//             <div className="mainboard_container">
//                 {images.map((image, index) => (
//                     <div key={image.id} className="image">
//                         {/* Wrap all elements related to each image inside a parent container */}
//                         <div className="top-btn">
//                             <Button
//                                 size="large"
//                                 className="like-btn"
//                                 icon={<HeartFilled />}
//                                 onClick={() => handleAction("Like")}
//                             />
//                             <Button
//                                 size="large"
//                                 className="add-btn"
//                                 icon={<PlusOutlined />}
//                                 onClick={() => handleAction("Add")}
//                             />
//                         </div>
//                         <div className="bottom-btn">
//                             <Button
//                                 size="large"
//                                 className="download-btn"
//                                 icon={<DownloadOutlined />}
//                                 onClick={() => handleAction("Download")}
//                             />
//                         </div>
//                         <div className="artist-info">
//                             <img
//                                 src={
//                                     "https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/374852207_3473181502955513_5066250399042915797_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeFK-YCTXTmYEZbuyizFU-9hMR_6p8bWSwExH_qnxtZLATUF4CJxoBYDUFxEiZ8BW7Su3Ot6k7vphoBITf1qMnsH&_nc_ohc=HdV6eApcuiEAX8vm2Gu&_nc_ht=scontent.fsgn16-1.fna&oh=00_AfA9ZIrDGIYoFRu2f1D-P8s-dTaNXGKvegN0I2RbdUsGkw&oe=65A7032A"
//                                 }
//                                 alt="artist avatar"
//                                 className="avatar"
//                             />
//                             <div className="info">
//                                 <p className="name">Cun</p>
//                                 <p className="tag">#nice</p>
//                             </div>
//                         </div>
//                         <img
//                             src={`https://i.pinimg.com/564x/8c/4a/51/8c4a51e005629a084505649079b0a949.jpg`}
//                             alt=""
//                             style={{
//                                 width: "100%",
//                                 height: "100%",
//                                 objectFit: "cover",
//                                 marginBottom: "10px",
//                                 marginRight: "10px",
//                             }}
//                             onClick={showModal}
//                         />
//                     </div>
//                 ))}
//             </div>
//             <Modal
//                 style={{ top: 20 }}
//                 open={modalVisible}
//                 onCancel={() => setModalVisible(false)}
//                 footer={null}
//                 width={1233}
//                 centered
//             >
//                 <div className="modal-content">
//                     <div className="top-modal">
//                         <div className="artist-info-modal">
//                             <img
//                                 src={
//                                     "https://images.unsplash.com/photo-1682686579688-c2ba945eda0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D"
//                                 }
//                                 alt="artist avatar"
//                                 className="avatar"
//                             />
//                             <div className="info">
//                                 <p className="name">Cun</p>
//                                 <p className="tag">#kk</p>
//                             </div>
//                         </div>
//                         <div className="modal-btns">
//                             <Button
//                                 size="large"
//                                 className="like-modal-btn"
//                                 icon={<HeartFilled />}
//                                 onClick={() => handleAction("Like")}
//                             />
//                             <Button
//                                 size="large"
//                                 className="add-modal-btn"
//                                 icon={<PlusOutlined />}
//                                 onClick={() => handleAction("Add")}
//                             />

//                             <Button
//                                 size="large"
//                                 className="download-modal-btn"
//                                 icon={<DownloadOutlined />}
//                                 onClick={() => handleAction("Download")}
//                             >
//                                 {" "}
//                                 Download
//                             </Button>
//                         </div>
//                     </div>
//                     <div className="image-container">
//                         <img
//                             className="img-modal"
//                             src={
//                                 "https://i.pinimg.com/564x/8c/4a/51/8c4a51e005629a084505649079b0a949.jpg"
//                             }
//                             alt=""
//                         />
//                     </div>
//                     <div className="bottom-section">
//                         <div className="download-count">
//                             Downloads
//                             <br /> <span>5,432</span>
//                         </div>
//                         <div className="actions">
//                             <Button
//                                 className="share-btn"
//                                 size="large"
//                             // onClick={handleShare}
//                             >
//                                 Share
//                             </Button>
//                             <Button
//                                 className="report-btn"
//                                 size="large"
//                             // onClick={handleReport}
//                             >
//                                 Report
//                             </Button>
//                         </div>
//                     </div>
//                     <div className="img-detail">
//                         <span>
//                             <CalendarOutlined /> Pushlished 12 days ago
//                         </span>
//                         <br />
//                         <span>
//                             <SafetyOutlined /> Free to use under the ArtAttack License
//                         </span>
//                     </div>
//                     <Space size={[0, 8]} wrap>
//                         {tags.map((tag, index) => (
//                             <Tag key={index}>{tag}</Tag>
//                         ))}
//                     </Space>
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default Favorite;