import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./Authentication.css"
import { Button, Image, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from "axios";
import { generateCode } from "../../assistants/Generators";
import logo from '../../assets/image/e1eb03f8282b4f89a438983023e90697 (1).png'

interface User {
    _id: string,
    email: string,
    password: string,
    nickName: string,
    role: string,
    numOfFollower: number,
    avatar: string,
    status: boolean,
}

export default function Reset() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()

    const randomImage = "https://i.pinimg.com/564x/3a/e6/7d/3ae67df286b9b8e568de17e4657fd21d.jpg";

    const resetPasswordForm = useFormik({
        initialValues: {
            password: '',
            confirm: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().min(5, "Password must contains within 5-18 letters").max(18, "Password must contains within 5-18 symbols").required(""),
            confirm: Yup.string().test('passwords-match', 'Passwords does not match', function (value) { return this.parent.password === value }),
        }),
        onSubmit: async (values) => {
            setIsLoading(true)
            await axios.patch(`http://localhost:5000/users/${params.id}`, {
                password: values.password
            })
                .then(() => {
                    console.log("Reset successfully.")
                })
                .catch(err => console.log(err))
            setTimeout(() => {
                setIsLoading(false)
                navigate('/signin')
            }, 2000)
        }
    })

    return (
        <div className="container">
            <div className="left-container">
                <Image src={randomImage} width={400} preview={false} />
            </div>
            <Divider type="vertical" />
            <div className="right-container row" style={{ padding: "20px 0" }}>
                <Image
                    className=""
                    src={logo}
                    height={100}
                    width={100}
                    preview={false}
                />
                <form onSubmit={resetPasswordForm.handleSubmit}>
                    <h5>Enter your email address to reset password.</h5>
                    <br />
                    <div className="mb-2 mt-2">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter new password"
                            onChange={resetPasswordForm.handleChange}
                            onBlur={resetPasswordForm.handleBlur}
                            value={resetPasswordForm.values.password}
                        />
                        <div className="error">
                            {resetPasswordForm.errors.password ? (
                                <i>{resetPasswordForm.errors.password}</i>
                            ) : null}
                        </div>
                    </div>

                    <div className="mb-2 mt-2">
                        <input
                            type="password"
                            name="confirm"
                            placeholder="Confirm your password"
                            onChange={resetPasswordForm.handleChange}
                            onBlur={resetPasswordForm.handleBlur}
                            value={resetPasswordForm.values.confirm}
                        />
                        <div className="error">
                            {resetPasswordForm.errors.confirm ? (
                                <i>{resetPasswordForm.errors.confirm}</i>
                            ) : null}
                        </div>
                    </div>
                    <span className="modal-button-group" style={{ flexDirection: "column", marginTop: "20px" }}>
                        <Button type="primary" htmlType="submit" shape="round" block disabled={isLoading ? true : false}>
                            {isLoading ? <LoadingOutlined /> : <p>Finish</p>}
                        </Button>
                        <Button type="default" shape="round" block onClick={() => { navigate(-1) }}>Back</Button>
                    </span>
                </form>
            </div>
        </div>

    )
}
