import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./Authentication.css"
import { Button, Image, Divider, Typography, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '../../assets/icons/facebook.png'
import emailjs from '@emailjs/browser';
import axios from "axios";
import eFurniLogo from '../../assets/logos/eFurniLogo_transparent.png'
import { generatePassword, generateCode } from "../../assistants/Generators";

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

interface OtherLoginResponse {
    id: string;
    userID: string;
    accessToken: string;
    name?: string | undefined;
    email?: string | undefined;
    picture?:
    | {
        data: {
            height?: number | undefined;
            is_silhouette?: boolean | undefined;
            url?: string | undefined;
            width?: number | undefined;
        };
    }
    | undefined;
}
interface CredentialResponse {
    credential?: string;
    select_by?: 'auto' | 'user' | 'user_1tap' | 'user_2tap' | 'btn' | 'btn_confirm' | 'btn_add_session' | 'btn_confirm_add_session';
    clientId?: string;
}

interface SignUpFormValues {
    email: string,
    password: string,
    confirm: string,
    nickname: string,
    code: string,
}

export default function Signup() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    const { Text } = Typography;
    const randomImage = "https://t4.ftcdn.net/jpg/05/51/69/95/360_F_551699573_1wjaMGnizF5QeorJJIgw5eRtmq5nQnzz.jpg"

    const [registerUser, setRegisterUser] = useState<User>({
        _id: "",
        email: '',
        password: "",
        nickName: "",
        role: "",
        numOfFollower: 0,
        avatar: "",
        status: false,
    })

    const [verifyCode, setVerifyCode] = useState("")
    const [codeStatus, setCodeStatus] = useState("")

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        var decoded: OtherLoginResponse
        if (credentialResponse.credential) {
            decoded = jwtDecode(credentialResponse.credential)
            console.log("SIGNIN SUCCESSFULLY. Google login user's email:", decoded.email)

            await fetch("http://localhost:5000/users")
                .then(res => res.json())
                .then(data => {
                    var foundUserByEmail = data.find((account: User) => (account.email === decoded.email))
                    if (foundUserByEmail) {
                        console.log("Email is already registered.")
                    }
                    else {
                        var registerUser = {
                            email: decoded.email,
                            password: generatePassword(30, ""),
                            nickname: decoded.name,
                            role: "user",
                            numOfFollower: 0,
                            avatar: "unset",
                            status: true,
                        }
                        axios.post("http://localhost:5000/users", registerUser)
                            .catch((err: any) => {
                                console.log("Error: ", err.response.data)
                            })
                        console.log("A new account has been created by email ", decoded.email)
                        setTimeout(() => {
                            setIsLoading(false)
                        }, 2000)
                    }
                })
                .catch(err => console.log(err))
            navigate('/')
        } else {
            console.log("Not found data")
        }
    }

    const onGoogleError = () => {
        console.log("Failed to login with Google")
    }

    const responseFacebook = (response: any) => {
        console.log("ResponseFacebook: ", response)
    }

    const formRef = useRef(null);
    const sendEmail = () => {
        if (formRef.current) {
            emailjs.sendForm('service_yhbkxq8', 'template_lhkes4m', formRef.current, 'zGPCRFdr4MiXVNMNw')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
        }
    };

    const initialValues: SignUpFormValues = {
        email: location.state?.email,
        password: '',
        confirm: '',
        nickname: '',
        code: generateCode(6, ""),
    }
    const signupForm = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required('Please enter your email'),
            password: Yup.string().min(5, "Password must contains within 5-18 symbols").max(18, "Password must contains within 5-18 letters").required("Please enter your password"),
            confirm: Yup.string().test('passwords-match', 'Passwords does not match', function (value) { return this.parent.password === value }),
            fullName: Yup.string().required("Please enter your full name"),
        }),
        onSubmit: async (values) => {
            setVerifyCode(values.code)
            setRegisterUser({
                email: values.email,
                password: values.password,
                nickName: values.nickname,
                role: "user",
                numOfFollower: 0,
                avatar: "unset",
                status: true,
            })
            sendEmail()
            showModal()
        }
    })

    const codeVerifyForm = useFormik({
        initialValues: {
            code: "",
            email: registerUser.email,
        },
        validationSchema: Yup.object({
            code: Yup.string().min(6, "Verify code should be a 6-digit one.").max(6, "Verify code should be a 6-digit one.").required("")
        }),
        onSubmit: (values) => {
            if (values.code === verifyCode) {
                axios.post('http://localhost:5000/users', registerUser)
                    .then((response: any) => {
                        console.log(response);
                    })
                    .catch((err: any) => {
                        console.log("Error: ", err.response.data)
                    });
                setIsLoading(true)
                setTimeout(() => {
                    setOpen(false);
                    setIsLoading(false);
                    console.log("Successfully registered");
                }, 2000);
            }
            else {
                setCodeStatus("Incorrect verification code ! Please check your email and try again.")
            }
        }
    })

    return (
        <div className="container">
            <div className="left-container">
                <Image src={randomImage} width={400} preview={false} />
            </div>
            <Divider type="vertical" />
            <div className="right-container row">
                <Image className="image" src={eFurniLogo} width={250} preview={false} />
                <form ref={formRef} onSubmit={signupForm.handleSubmit}>
                    <div className="mb-2 mt-2">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.email}
                        />
                        <div className="error">
                            {signupForm.touched.email && signupForm.errors.email ? (
                                <i>{signupForm.errors.email}</i>
                            ) : null}
                        </div>
                    </div>
                    <div className="mb-2 mt-2">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.password}
                        />
                        <div className="error">
                            {signupForm.touched.password && signupForm.errors.password ? (
                                <i>{signupForm.errors.password}</i>
                            ) : null}
                        </div>
                    </div>
                    <div className="mb-2 mt-2">
                        <input
                            type="password"
                            name="confirm"
                            placeholder="Confirm password"
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.confirm}
                        />
                        <div className="error">
                            {signupForm.touched.confirm && signupForm.errors.confirm ? (
                                <i>{signupForm.errors.confirm}</i>
                            ) : null}
                        </div>
                    </div>
                    <div className="mb-2 mt-2">
                        <input
                            type="text"
                            name="nickname"
                            placeholder="Your name"
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.nickname}
                        />
                        <div className="error">
                            {signupForm.touched.nickname && signupForm.errors.nickname ? (
                                <i>{signupForm.errors.nickname}</i>
                            ) : null}
                        </div>
                    </div>
                    <input
                        type="hidden"
                        name="code"
                        onChange={signupForm.handleChange}
                        onBlur={signupForm.handleBlur}
                        value={signupForm.values.code}
                    />
                    <br />
                    <Button type="primary" htmlType="submit" shape="round" size="large" disabled={isLoading ? true : false}>
                        {isLoading ? <LoadingOutlined /> : <p>Sign up</p>}
                    </Button>
                </form>
                <Divider><Text italic style={{ fontSize: "70%" }}>or you can sign in with</Text></Divider>
                <div className="otherLogin">
                    <GoogleLogin
                        onSuccess={onGoogleSuccess}
                        onError={onGoogleError}
                        size="large"
                        type="icon"
                    />
                    <FacebookLogin
                        appId="689804996380398"
                        autoLoad={true}
                        fields="name,email"
                        callback={responseFacebook}
                        size="small"
                        cssClass="my-facebook-button-class"
                        textButton=""
                        icon={<Image src={FacebookIcon} width={20} preview={false} height={22} />}
                    />
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
                                {codeStatus !== "" ? (
                                    <i>{codeStatus}</i>
                                ) : null}
                            </div>
                            <input
                                type="hidden"
                                name="email"
                                onChange={signupForm.handleChange}
                                onBlur={signupForm.handleBlur}
                                value={signupForm.values.email}
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
                <div className="form-footer">
                    <p>Already have account?&nbsp;</p>
                    <a onClick={() => { navigate('/signin') }}>Sign in</a>
                </div>
            </div>
        </div>
    )
}
