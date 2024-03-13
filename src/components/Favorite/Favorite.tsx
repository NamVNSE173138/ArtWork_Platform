

//---------------------------------------------------------------------------------- main 

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
import axios from 'axios';

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

const Favorite: React.FC = () => {
    const [favoriteList, setFavoriteList] = useState<FavoriteList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        const fetchFavoriteList = async () => {
            try {
                const token = localStorage.getItem("USER");
                const response = await axios.get('http://localhost:5000/artworks/getUserFavoriteList', {
                    headers: {
                        token: token
                    }
                });
                setFavoriteList(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching favorite list:", error);
                setError("Error fetching favorite list");
                setLoading(false);
            }
        };
        fetchFavoriteList();
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
        return <Alert message={error} type="error" />;
    }

    return (
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
                            // onClick={() => handleAction("Like")}
                            />
                            <Button
                                size="large"
                                className="add-btn"
                                icon={<PlusOutlined />}
                            // onClick={() => handleAction("Add")}
                            />
                        </div>
                        <div className="bottom-btn">
                            <Button
                                size="large"
                                className="download-btn"
                                icon={<DownloadOutlined />}
                            // onClick={() => handleAction("Download")}
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




