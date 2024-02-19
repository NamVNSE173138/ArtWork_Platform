import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./Authentication.css"
import { Button, Image, Divider, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
import { generateCode } from "../../assistants/Generators";
// import Reset from "./Reset";
import eFurniLogo from '../../assets/logos/eFurniLogo_transparent.png'

interface User {
    _id?: string,
    email: string,
    password: string,
    nickName: string,
    role: string,
    numOfFollower: number,
    avatar: string,
    status: boolean,
}

export default function Forgot() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const randomImage = "https://t4.ftcdn.net/jpg/05/51/69/95/360_F_551699573_1wjaMGnizF5QeorJJIgw5eRtmq5nQnzz.jpg"

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const [user, setUser] = useState<User>({
        _id: "",
        email: "",
        password: "",
        nickName: "",
        role: "user",
        numOfFollower: 0,
        avatar: "unset",
        status: false,
    })
    const [verifyCode, setVerifyCode] = useState("")

    const formRef = useRef(null)
    const sendEmail = () => {
        if (formRef.current) {
            emailjs.sendForm('service_yhbkxq8', 'template_hqbho7z', formRef.current, 'zGPCRFdr4MiXVNMNw')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
        }
    };

    const emailForm = useFormik({
        initialValues: {
            email: '',
            code: generateCode(6, "")
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("")
        }),
        onSubmit: async (values) => {
            setIsLoading(true)
            await fetch('http://localhost:5000/users')
                .then(res => res.json())
                .then(data => {
                    const foundAccountByEmail = data.find((account: User) => (account.email === values.email))
                    if (foundAccountByEmail) {
                        fetch(`http://localhost:5000/users/${foundAccountByEmail._id}`)
                            .then(res => res.json())
                            .then(data => {
                                setUser(data)
                            })
                        setVerifyCode(emailForm.initialValues.code)
                        setIsLoading(false)
                        sendEmail()
                        showModal()
                    }
                    else {
                        emailForm.setErrors({
                            email: "This email is not registered."
                        })
                        setIsLoading(false)
                    }
                })
                .catch(err => {
                    console.log(err)
                    setIsLoading(false)
                })
        }
    })

    const codeVerifyForm = useFormik({
        initialValues: {
            code: "",
        },
        validationSchema: Yup.object({
            code: Yup.string().min(6, "Verify code should be a 6-digit one.").max(6, "Verify code should be a 6-digit one.").required("")
        }),
        onSubmit: (values) => {
            if (values.code === verifyCode) {
                setIsLoading(true)
                setTimeout(() => {
                    setOpen(false);
                    setIsLoading(false);
                    navigate(`/reset/${user._id}`)
                }, 2000);
            }
            else {
                codeVerifyForm.setErrors({
                    code: "Incorrect verification code. Please check your email and try again."
                })
            }
        }
    })

    return (
        <div className="container">
            <div className="left-container">
                <Image src={randomImage} width={400} preview={false} />
            </div>
            <Divider type="vertical" />
            <div className="right-container row" style={{ padding: "20px 0" }}>
                <Image className="image" src={eFurniLogo} width={250} preview={false} />
                <form ref={formRef} onSubmit={emailForm.handleSubmit}>
                    <h5>Enter your email address to reset password.</h5>
                    <br />
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter your email address"
                        onChange={emailForm.handleChange}
                        onBlur={emailForm.handleBlur}
                        value={emailForm.values.email}
                    />
                    <input
                        type="hidden"
                        name="code"
                        value={emailForm.values.code}
                    />
                    <div className="error">
                        {emailForm.errors.email ? (
                            <i>{emailForm.errors.email}</i>
                        ) : null}
                    </div>
                    <span className="modal-button-group" style={{ flexDirection: "column", marginTop: "20px" }}>
                        <Button type="primary" htmlType="submit" shape="round" block disabled={isLoading ? true : false}>
                            {isLoading ? <LoadingOutlined /> : <p>Continue</p>}
                        </Button>
                        <Button type="default" shape="round" block onClick={() => { navigate(-1) }}>Back</Button>
                    </span>
                </form>
                <Modal
                    title="Email sent"
                    open={open}
                    onCancel={handleCancel}
                    confirmLoading={isLoading}
                    footer={null}
                >
                    <form onSubmit={codeVerifyForm.handleSubmit}>
                        <h5>Please check your email for the verification code.</h5>
                        <br />
                        <input type="text"
                            name="code"
                            placeholder="Enter the code here"
                            onChange={codeVerifyForm.handleChange}
                            onBlur={codeVerifyForm.handleBlur}
                            value={codeVerifyForm.values.code}
                        />
                        <div className="error">
                            {codeVerifyForm.errors.code ? (
                                <i>{codeVerifyForm.errors.code}</i>
                            ) : null}
                        </div>
                        <input
                            type="hidden"
                            name="email"
                            onChange={emailForm.handleChange}
                            onBlur={emailForm.handleBlur}
                            value={emailForm.values.email}
                        />
                        <span className="modal-button-group">
                            <Button type="default" shape="round" onClick={handleCancel}>Cancel</Button>
                            <Button type="primary" htmlType="submit" shape="round" disabled={isLoading ? true : false}>
                                {isLoading ? <LoadingOutlined /> : <p>Verify {verifyCode}</p>}
                            </Button>
                        </span>
                    </form>
                </Modal>
            </div>
        </div>

    )
}
