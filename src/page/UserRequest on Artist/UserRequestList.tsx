import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Space, Typography, Button, message, Table, Image, Popconfirm, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import dateFormat from '../../assistants/date.format';
import moment from 'moment';

interface User {
    _id: string,
    email: string,
    nickname: string,
    bio: string,
    role: string,
    numOfFollower: number,
    avatar: string,
    password: string,
    status: boolean,
    createdAt?: string,
    updatedAt?: string,
}

interface UserRequest {
    _id: string,
    name: string,
    description: string,
    priceEst: number,
    message: string,
    artist: User,
    user: User,
    createdAt: string,
    updatedAt: string,
}

export default function UserRequestList() {
    const navigate = useNavigate()
    const { Text, Title } = Typography
    const [messageApi, contextHolder] = message.useMessage()

    const userToken = localStorage.getItem("USER")
    const [userRequestList, setUserRequestList] = useState([])

    const fetchUserRequest = async () => {
        await axios.get(`http://localhost:5000/users/getUserInfo`, {
            headers: {
                token: userToken, //userToken = localStorage("USER")
            },
        })
            .then((res) => {
                console.log("Current user data: ", res.data)
                axios.get(`http://localhost:5000/userRequests/artist/${res.data.id}`)
                    .then((res) => {
                        console.log("User request list: ", res.data)
                        setUserRequestList(res.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err));

    };

    useEffect(() => {
        fetchUserRequest()
    }, [])

    const columns: TableProps<UserRequest>['columns'] = [
        {
            title: 'From user',
            dataIndex: 'user',
            key: 'user',
            align: 'center',
            render: (_, { user }) => (
                <Flex justify='start' align='center' gap={10} style={{ cursor: 'pointer' }}>
                    <Image src={user.avatar} alt='' style={{ borderRadius: '50%', width: '50px' }} />
                    <Text strong onClick={() => navigate(`../../artistList/${user._id}`)}>{user.nickname}</Text>
                </Flex>
            )
        },
        {
            title: "Artwork request's name",
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'Estimated price ($)',
            dataIndex: 'priceEst',
            key: 'priceEst',
            align: 'center',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            align: 'center',
        },
        {
            title: 'Sent at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (_, { createdAt }) => (
                <Space size="middle">
                    <Flex vertical>
                        <Text strong>{moment(createdAt).fromNow()}</Text>
                        <Text style={{ fontSize: '80%' }} >{dateFormat(createdAt, 'HH:MM dd/mm/yyyy')}</Text>
                    </Flex>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, { _id }) => (
                <Space size="middle">
                    <Button type='primary' style={{ display: 'flex', alignItems: 'center' }}
                        onClick={() => navigate(`/userRequest/approval/${_id}`)}>
                        Approve
                    </Button>
                    <Popconfirm
                        title="Recall this request ?"
                        // description="Are you sure to delete this task?"
                        icon={<DeleteOutlined style={{ color: 'red' }} />}
                        onConfirm={() => deleteRequest(_id)}
                    >
                        <Button type='primary' danger style={{ display: 'flex', alignItems: 'center' }}>
                            Deny
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
        {
            title:
                <Tooltip title='Reload' overlayInnerStyle={{ backgroundColor: '#FFF', color: '#000' }}>
                    <Button onClick={() => fetchUserRequest()} style={{ display: 'flex', alignItems: 'center' }}>
                        <ReloadOutlined />
                    </Button>
                </Tooltip>,
            width: '70px'
        }
    ]

    const deleteRequest = async (id: string) => {
        await axios.delete(`http://localhost:5000/userRequests/${id}`)
            .then((res) => {
                console.log("Delete request: ", res.data)
                setUserRequestList(userRequestList.filter((item: any) => item._id !== id))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Table columns={columns} dataSource={userRequestList}
            pagination={{ hideOnSinglePage: true }}
            scroll={{ y: 500, scrollToFirstRowOnChange: true }} />
    )
}
